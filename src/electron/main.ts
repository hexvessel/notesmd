import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath, isDev } from "./util.js";
import { readDir } from "./fileUtils.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width:1280,
    height: 960,
    webPreferences: {
      preload: getPreloadPath(),
    }
  });
  if(isDev())
  {
    mainWindow.loadURL('http://localhost:5123');
  }
  else
  {
  mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  ipcMain.handle("getmarkdownfiles", readDir);
});
