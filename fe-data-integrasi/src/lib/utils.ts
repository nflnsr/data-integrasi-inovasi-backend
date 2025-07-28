// needs to be updated, adopt a modular style
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API || "https://test-data-integrasi-inovasi-be.vercel.app/api",
  withCredentials: true,
});

const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API || "https://test-data-integrasi-inovasi-be.vercel.app/api",
  withCredentials: true,
});

function getBase64(
  file: File,
  cb: (result: string) => void,
) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result as string);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

const validateFile = (file: File) => {
  const maxSize = 100000;
  const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedFormats.includes(file.type)) {
    alert("Format file tidak didukung.");
    return false;
  }

  if (file.size > maxSize) {
    alert("Ukuran file terlalu besar, maksimal 100kb.");
    return false;
  }

  return true;
};

export { axiosInstance, axiosPrivateInstance, getBase64, validateFile };
