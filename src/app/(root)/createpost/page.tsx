"use client";

import { Pencil } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "@mui/material/TextField/textFieldClasses";
import { Input, InputAdornment, InputLabel } from "@mui/material";
import ImageUpload from "@/components/ImageUpload";
import { FiUpload } from "react-icons/fi";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/Loader";
import axios from "axios";

const CreatePostPage = () => {
  const searchParam = useSearchParams();
  const [postText, setPostText] = useState<string | null>("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const inputValue = searchParam.get("inputValue");

  const { data } = useSession();

  //effects
  useEffect(() => {
    if (inputValue) {
      setPostText(inputValue);
    }
  }, [inputValue]);

  //functions
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostText(value);
    // router.replace(`/createpost?inputValue=${postText}`)
  };

  const handleUpload = async () => {
    if (!data?.user) {
      toast({
        title: "Login first",
      });
      router.push("/login");
    } else {
      if (!postText) {
        toast({
          title: "Please Enter a caption",
          variant: "destructive",
        });
      } else {
        if (!imageUrl) {
          toast({
            title: "Please Select a photo",
            variant: "destructive",
          });
        } else {
          setIsLoading(true);
          const response = await axios.post("/api/createpost", {
            postText,
            imageUrl,
            userEmail: data?.user?.email,
          });

          if(response?.data?.success){
            toast({
              title: response.data.message,
              description:"redirected to your post"
            })
            router.push(`/postcontent/${response.data.post.id}`)
          }else{
            toast({
              title: response.data.message,
              variant:"destructive"
            })
          }
          setIsLoading(false)
        }
      }
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full p-2">
        <div>
          <h2 className="text-xl font-bold">Create a public post</h2>
          <p className="text-[#aaa]">
            Posts made by you will be visible to the public. Everyone is able to
            leave comments and likes on your post.
          </p>
        </div>
        <div className="mt-5 max-w-[500px] w-full p-3 mx-auto">
          <div className="flex items-center justify-center gap-2 flex-col">
            <div className="w-full h-full relative">
              <input
                type="text"
                className="w-full h-full px-5 py-2 boxshadow bg-transparent rounded-lg outline-none pl-10"
                placeholder="Caption"
                value={postText!}
                onChange={handleCaptionChange}
              />
              <Pencil
                className="absolute top-[20%] left-3 text-[#bbb]"
                size={"20px"}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-5 flex-col w-full ">
            {imageUrl ? (
              <>
                <Image src={imageUrl} height={600} width={600} alt="image" />
              </>
            ) : (
              <>
                <ImageUpload value={imageUrl} onChange={setImageUrl} post />
                <p className="mt-3 text-[#bbb]">
                  {"(Please select at least 1 image)"}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center justify-center mt-5">
            <button
              className="px-5 py-2 border-t border-t-white border-l border-l-white  transition-all rounded-md max-w-[300px] text-lg w-full flex items-center justify-center gap-2 font-bold boxshadow hover:bg-[#e2e2e28f]"
              onClick={handleUpload}
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
      </div>
    </Suspense>
  );
};

export default CreatePostPage;
