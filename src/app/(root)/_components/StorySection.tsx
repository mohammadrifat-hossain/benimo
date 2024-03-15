import { toast } from "@/components/ui/use-toast";
import { StoryType } from "@/lib/types";
import axios from "axios";
import { Trash } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StorySection = ({ item, myStory }: { item: StoryType, myStory?: boolean }) => {
  const [formattedDate, setFormattedDate] = useState("");

  const router = useRouter()
  //functions
  const updateFormattedDate = (newDate: any) => {
    if (newDate) {
      const parsedDate = moment(newDate);
      if (parsedDate.isValid()) {
        setFormattedDate(parsedDate.fromNow());
      } else {
        console.error("Invalid date format:", newDate);
      }
    }
  };
  useEffect(() => {
    updateFormattedDate(item.createdAt); // Replace with your actual date string
  }, [item]);


  const deleteStory = async () => {
    const {data} = await axios.post('/api/deletestory',{
      storyId: item._id
    })
    
    if(data?.success){
      toast({
        title: data?.message
      })
      router.refresh()
    }
    
  }

  return (
    <div>
      <div className="w-full flex  items-center gap-2 mb-1">
        <Image
          src={item.userImage}
          height={40}
          width={40}
          alt="user"
          className="rounded-full border-[2px]"
        />
        <div>
          <h1 className="text-lg">{item.userName}</h1>
          <p className="text-sm text-[#bbb]">{formattedDate}</p>
        </div>
        <div className={`cursor-pointer absolute right-14 top-3 mr-0 ${myStory ? "block": "hidden"}`}>
          <Trash onClick={deleteStory}/>
        </div>
      </div>
      <Image
        alt="story"
        src={item.imageUrl}
        placeholder="blur"
        height={1000}
        width={1000}
        blurDataURL="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fgifs%2Floading-balls-balls-bounce-4802%2F&psig=AOvVaw0tZbCiDzQ9qn7Bj1oWMEwb&ust=1709870906460000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDOi_Wj4YQDFQAAAAAdAAAAABAx"
      />
    </div>
  );
};

export default StorySection;
