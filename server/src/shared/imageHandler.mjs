import path from "path";
import uniqid from "uniqid";

const generateUniqueFileName = (name) => `${uniqid()}${path.extname(name)}`;

export const PHOTOS_FOLDER = "TourPhotos";

export const WriteFile = async (file) => {

    const fileName = generateUniqueFileName(file.name);
    const fullPath = path.join(PHOTOS_FOLDER, fileName);
    
    await file.mv(fullPath);

    return fullPath;
};