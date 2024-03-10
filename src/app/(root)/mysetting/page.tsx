"use client";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "@/components/ui/use-toast";
import { UserProfileType } from "@/lib/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const SettingPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);

  const { data: userData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!userData?.user) {
      router.push("/login");
    }
  }, [userData, router]);

  const getUser = useCallback(async () => {
    const { data } = await axios.post("/api/getuser", {
      userEmail: userData?.user?.email,
    });
    setUserInfo(data?.userInfo);
  }, [userData]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (userInfo) {
      setImageUrl(userInfo?.image);
      setUserName(userInfo?.name);
    }
  }, [userInfo]);

  //

  const handleProfileEdit = async () => {
    const {data} = await axios.put('/api/updateprofile',{
      imageUrl,
      userName,
      oldPassword,
      newPassword,
      userId: userInfo?.id
    })
    if(data?.success){
      toast({
        title: data?.message
      })
      router.push('/profile')
    }else{
      toast({
        title: data?.message
      })
    }
  }

  return (
    <div className="w-full">
      <div>
        <div className="max-w-[1000px] mx-auto flex items-center justify-center flex-col mt-5 gap-3">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <div className="flex items-center gap-2">
            <span className="text-lg text-slate-800">Username:</span>
            <input
              type="text"
              className="w-full px-5 py-2 rounded-full focus:shadow-sm outline-none transition-all hover:shadow-sm bg-transparent border-[#bbbbbb91] border"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          {userInfo?.password && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-lg text-slate-800 flex text-nowrap">
                  Old Password:
                </span>
                <input
                  type="password"
                  className="w-full px-5 py-2 rounded-full focus:shadow-sm outline-none transition-all hover:shadow-sm bg-transparent border-[#bbbbbb91] border"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg text-slate-800 flex text-nowrap">
                  New Password:
                </span>
                <input
                  type="password"
                  className="w-full px-5 py-2 rounded-full focus:shadow-sm outline-none transition-all hover:shadow-sm bg-transparent border-[#bbbbbb91] border"
                  placeholder="Enter New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <button className="px-5 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all text-white" onClick={handleProfileEdit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
