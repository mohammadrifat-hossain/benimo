"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  post?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, post }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="y8hnqh8p"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-4 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 w-[200px] h-[200px]`}
          >
            <TbPhotoPlus size={30} />
            <div className="font-semibold text-lg">Click to Upload</div>
            {value && !post && (
              <div className="h-full w-full">
                <Image
                  fill
                  alt="image"
                  className="absolute inset-0 w-full h-full"
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
