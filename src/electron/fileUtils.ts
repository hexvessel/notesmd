import { BrowserWindow, app, dialog } from "electron";
import path from 'path';
import fs from "fs";
import { isDev } from "./util.js";

const EXTENSION = ".md";



export function readDir(): filePackage[]
{
    const folder = dialog.showOpenDialogSync(
        {
        properties:[
            'openDirectory'
            ]
        }
    );
    const directory: string | undefined = folder === undefined ? app.getAppPath() : folder[0];
    const fileNames = fs.readdirSync(directory).filter( file => {
        return path.extname(file).toLowerCase() === EXTENSION; 
    });
    const files = fileNames.map((file) => {
        return { filename: file, contents: fs.readFileSync(path.join(directory, file), {encoding: 'utf-8'}), bookmarks: []};
    })
    return files;
}