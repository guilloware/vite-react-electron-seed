interface IElectronAPI {
    send: (channel: string, data?: any) => void;
    isPackaged: boolean;
}

interface Window {
    electron: IElectronAPI;
}
