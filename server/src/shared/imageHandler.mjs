import path from "path";
import uniqid from "uniqid";
import fs from "fs/promises";

// PRIMINIMAS MAN PACIAM: DUOMENU BAZEJE SAUGOMAS NEPILNAS PATH IKI NUOTRAUKOS
// DUOMENU BAZEJE SAUGOMAS PATH BE PUBLIC FOLDERIO, KAD KLIENTUI DUOTI TEISINGA IR PATOGU PATH

/* global process */

const generateUniqueFileName = (name) => `${uniqid()}${path.extname(name)}`;

export const PUBLIC = "public";

const PHOTOS_FOLDER = "TourPhotos";
const FULL_PHOTOS_PATH = path.join(PUBLIC, PHOTOS_FOLDER);

export const writeFile = async (file) => {

    const fileName = generateUniqueFileName(file.name);
    const pathForClient = path.join(PHOTOS_FOLDER, fileName);
    const fullPath = path.join(FULL_PHOTOS_PATH, fileName);
    
    await file.mv(fullPath);

    return pathForClient;
};

export const deleteFile = async (imgPath) => {
    await fs.unlink(path.join(process.cwd(), PUBLIC, imgPath));
};

export const updateFile = async (file, imgPath) => {  
    const newExtension = path.extname(file.name);
    const currentExtension = path.extname(imgPath);
    if(newExtension !== currentExtension){
        const originalPath = imgPath;
        await deleteFile(originalPath);
        imgPath = imgPath.substring(0, imgPath.length-currentExtension.length);
        imgPath += newExtension;
    }
    await file.mv(path.join(PUBLIC, imgPath));
    return imgPath;
};

export const createPhotosFolderIfNotExists = async () => {
    await fs.mkdir(path.join(process.cwd(), FULL_PHOTOS_PATH), { recursive:true });
};