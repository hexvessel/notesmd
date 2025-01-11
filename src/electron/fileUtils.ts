import { BrowserWindow } from "electron";
import path from 'path';
import fs from "fs";

const EXTENSION = ".md";

export function readDir(): string[]
{
    const fileNames = fs.readdirSync("./").filter( file => {
        return path.extname(file).toLowerCase() === EXTENSION; 
    });
    return fileNames;
}