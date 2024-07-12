import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = process.env.VITE_HOST;
const port = process.env.VITE_PORT;

let mainWindow: BrowserWindow | null = null;
let devToolsWindow: BrowserWindow | null = null;

const registerIpcHandlers = (mainWindow: BrowserWindow | null = null) => {
    ipcMain.on('open-devtools', () => {
        if (!devToolsWindow) {
            const mainWindowBounds = mainWindow?.getBounds();
            devToolsWindow = new BrowserWindow({
                width: 800,
                height: 600,
                parent: mainWindow ?? undefined,
                modal: false,
                show: false,
                x: mainWindowBounds ? mainWindowBounds.x + 50 : undefined,
                y: mainWindowBounds ? mainWindowBounds.y + 50 : undefined,
                webPreferences: {
                    contextIsolation: true,
                    nodeIntegration: false,
                },
            });

            devToolsWindow.once('ready-to-show', () => {
                devToolsWindow?.show();
            });

            mainWindow?.webContents.setDevToolsWebContents(devToolsWindow.webContents);
            mainWindow?.webContents.openDevTools({ mode: 'detach' });

            devToolsWindow.on('closed', () => {
                devToolsWindow = null;
            });
        } else {
            devToolsWindow.show();
        }
    });

    ipcMain.handle('is-packaged', () => app.isPackaged);

    ipcMain.on('minimize-window', () => {
        mainWindow?.minimize();
    });

    ipcMain.on('maximize-window', () => {
        if (mainWindow?.isMaximized()) {
            mainWindow?.unmaximize();
        } else {
            mainWindow?.maximize();
        }
    });

    ipcMain.on('close-window', () => {
        mainWindow?.close();
    });

};

function createWindow() {
    const browserWidth = 560;
    const browserHeight = 800;

    mainWindow = new BrowserWindow({
        width: browserWidth,
        height: browserHeight,
        // icon: path.join(__dirname, 'assets', 'icons', 'orpheus-logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: true,
            webSecurity: true
        },
    });

    console.log(`ENV HOST: ${host}`);
    console.log(`ENV PORT: ${port}`);

    const startUrl = path.join(__dirname, 'index.html');
    mainWindow.setMinimumSize(browserWidth, browserHeight);
    mainWindow.loadURL(startUrl).catch((err: any) => console.error(err));
    mainWindow.removeMenu();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function startServer() {
    const server = express();
    server.use(express.static(path.join(__dirname, '../dist')));

    server.listen(port, () => {
        console.log(`Server is running on http://${host}:${port}`);
        checkServerReady(`http://${host}:${port}`, 5000, 10)
            .then(() => {
                createWindow()
                registerIpcHandlers(mainWindow);
            })
            .catch((err) => {
                console.error('Failed to load the server:', err);
                app.quit();
            });
    });
}

app.on('ready', startServer);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

async function checkServerReady(url: string, timeout: number, retries: number) {
    for (let i = 0; i < retries; i++) {
        try {
            await axios.get(url);
            return;
        } catch (error) {
            console.log(`Waiting for server... (${i + 1}/${retries})`);
            await new Promise((resolve) => setTimeout(resolve, timeout));
        }
    }
    throw new Error(`Server not ready after ${retries} retries`);
}
