
import imageCompression from "browser-image-compression";
import { isValidFileType } from "./isValidType";
import { axiosInstance } from "./axiosInstance";
import { imageUpload } from "./ApiRoutesFile";
export const uploadFile = async (file) => {
  const token = localStorage.getItem('btelco_admin_panel');
  const header = {
    "Content-Type": "multipart/form-data",
    "x-auth-token": token,
  };
  try {
    const check = isValidFileType(file);
    if (!check) {
      throw ({ message: "!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg" })
    }
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile =  await imageCompression(file, options);
    const formData = new FormData();
    formData.append("image", compressedFile);
    const response = await axiosInstance.post(imageUpload, formData, { headers: header });
    
    return response;
  } catch (error) {
    // console.error("Error uploading file:", error);
    throw error;
  }
};
