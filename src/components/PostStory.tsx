import { Plus } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import ImageUpload from "./ImageUpload";
import { FiUpload } from "react-icons/fi";
import { toast } from "./ui/use-toast";
import Image from "next/image";

interface PostStoryProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  storyImage: string;
  setStoryImage: Dispatch<SetStateAction<string>>;
}

const PostStory = ({
  isOpen,
  setIsOpen,
  storyImage,
  setStoryImage,
}: PostStoryProps) => {
  const [isLoading, setIsLoading] = useState(false);

  //functions
  const handleClose = () => {
    if (storyImage) {
      setIsOpen(false);
      //upload functionality
    } else {
      toast({
        title: "Please select a image",
        variant: "destructive",
      });
    }
  };

  const handleStoryPost = async () => {
    if(storyImage){
      setIsOpen(false)
    }else{
      toast({
        title:"Select a image"
      })
    }
  }
  return (
    <div
      className={`fixed h-screen top-0 left-0 backdrop-blur-sm  w-full ${
        isOpen ? "flex" : "hidden"
      } bg-[#0000004b] z-50 items-center justify-center`}
    >
      <div className="max-w-[700px] max-h-[700px] h-full rounded-md shadow-md w-full bg-[#f0f0f0] relative p-3">
        <div className="flex items-center justify-between">
          <h1 className="text-sm text-[#aaa]">
            Story will be visible to your followers for 24 hours
          </h1>
          <button onClick={() => setIsOpen(false)}>
            <Plus className=" rotate-45" />
          </button>
        </div>
        <div className="h-full w-full flex items-center justify-center flex-col gap-4">
          {
            !storyImage ? <ImageUpload value={storyImage} onChange={setStoryImage} post />: (
              <Image
                alt="Image"
                height={1000}
                width={1000}
                src={storyImage!}
              />
            )
          
          }
          <button
            className="px-5 py-2 border-t border-t-white border-l border-l-white  transition-all rounded-md max-w-[300px] text-lg w-full flex items-center justify-center gap-2 font-bold boxshadow hover:bg-[#e2e2e28f]"
            onClick={handleStoryPost}
            disabled={isLoading}
          >
            {isLoading ? (
              "UPLOADING..."
            ) : (
              <>
                UPLOAD <FiUpload />
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className="absolute h-full w-full left-0 right-0 -z-[1]"
        onClick={handleClose}
      ></div>
    </div>
  );
};

export default PostStory;
