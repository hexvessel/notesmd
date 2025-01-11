const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    getMarkdownFiles: () => electron.ipcRenderer.invoke("getmarkdownfiles"), 
})