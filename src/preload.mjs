const { contextBridge, ipcRenderer } = require('electron');

let isPackaged = false;

ipcRenderer.invoke('is-packaged').then(result => {
    isPackaged = result;
    contextBridge.exposeInMainWorld('electron', {
        send: (channel, data) => {
            let validChannels = ['open-devtools'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        isPackaged: isPackaged
    });
});
