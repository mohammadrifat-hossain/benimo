'use client'
import Image from "next/image";

export const Loader = () => {
  return (
    <div className="fixed h-screen w-screen flex items-center justify-center left-0 top-0">
      <Image
        src={
          "https://i.pinimg.com/originals/2c/bb/5e/2cbb5e95b97aa2b496f6eaec84b9240d.gif"
        }
        height={400}
        width={400}
        alt="loading"
      />
    </div>
  );
};
