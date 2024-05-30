import path from "path";
import uniqid from "uniqid";
import fs from "fs";

/* global process */

const generateUniqueFileName = (name) => `${uniqid()}${path.extname(name)}`;

export const PHOTOS_FOLDER = "TourPhotos";

export const WriteFile = async (file) => {

    const fileName = generateUniqueFileName(file.name);
    const fullPath = path.join(PHOTOS_FOLDER, fileName);
    
    await file.mv(fullPath);

    return fullPath;
};

export const createPhotosFolderIfNotExists = () => {
    fs.mkdir(path.join(process.cwd(), PHOTOS_FOLDER), { recursive:true },
        (err) => {
            if(err){
                throw err;
            }
        }
    );
};