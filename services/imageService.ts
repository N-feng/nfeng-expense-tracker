import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (!file) return { success: true, data: null };
    // If file is already a string URL, return it
    if (typeof file === "string") {
      return { success: true, data: file };
    }

    // Check if file object has uri
    if (file && file.uri) {
      const formData = new FormData();

      // For React Native, FormData expects specific format
      formData.append("file", {
        uri: file.uri,
        type: "image/jpeg", // Fixed: removed dot
        name: file.uri.split("/").pop() || "upload.jpg",
      } as any);

      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      console.log("Uploading to:", CLOUDINARY_API_URL);
      console.log("Upload preset:", CLOUDINARY_UPLOAD_PRESET);
      console.log("Folder:", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 second timeout
      });

      if (response.data && response.data.secure_url) {
        return { success: true, data: response.data.secure_url };
      } else {
        return { success: false, msg: "Upload successful but no URL returned" };
      }
    }

    return { success: false, msg: "No file provided" };
  } catch (error: any) {
    console.log("Upload error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config?.url,
    });

    // More specific error messages
    if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
      return {
        success: false,
        msg: "Network connection failed. Check your internet connection.",
      };
    }

    if (error.response?.status === 400) {
      return {
        success: false,
        msg: "Invalid upload parameters. Check your upload preset and file format.",
      };
    }

    if (error.response?.status === 401) {
      return {
        success: false,
        msg: "Unauthorized. Check your Cloudinary credentials.",
      };
    }

    return { success: false, msg: error.message || "Could not upload file" };
  }
};

export const getProfileImage = (file: any) => {
  if (file && typeof file === "string") return file;
  if (file && typeof file === "object") return file.uri;
  return require("../assets/images/defaultAvatar.png");
};

export const getFilePath = (file: any) => {
  if (file && typeof file === "string") return file;
  if (file && typeof file === "object") return file.uri;

  return null;
};
