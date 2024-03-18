"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UserProfileType } from "@/lib/types";
import axios from "axios";
import { Search, UserRoundSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "./ui/use-toast";

const SearchDrawer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchUsers, setSearchUsers] = useState<UserProfileType[] | null>(
    null
  );

  //functions
  const handleSearch = async () => {
    if (searchValue) {
      await axios
        .post("/api/searchuser", {
          searchValue,
        })
        .then((data) => {
          setSearchUsers(data?.data?.result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast({
        title: "Enter a name first!",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Search size={"30px"} />
      </DialogTrigger>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <span>
                <UserRoundSearch />
              </span>
              <p>Search for people</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Find people by their fullname or username
          </DialogDescription>
          <div className="w-full flex items-center justify-center gap-2">
            <input
              type="text"
              className="px-3 md:px-5 py-1 rounded-full outline-none border focus:shadow-md hover:shadow-md transition-all"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="px-2 md:px-5 py-1.5  rounded-full border flex items-center gap-2 hover:shadow-md text-slate-500 hover:text-slate-900 transition-all"
              onClick={handleSearch}
            >
              <Search />
              Search
            </button>
          </div>
          <div className="h-[50vh]">
            <div className="w-full h-full border-t flex flex-col justify-start items-center gap-2 pt-2">
              {searchUsers?.length! > 0 ? (
                searchUsers?.map((item, i) => (
                  <Link href={`/userprofile/${item?.id}`} key={i}>
                    <DialogClose className="flex p-3 border rounded-md gap-3 items-center hover:shadow-lg transition-all cursor-pointer w-[300px]">
                      <Image
                        src={item?.image!}
                        height={50}
                        width={50}
                        alt="user"
                        className="rounded-full"
                      />
                      <h1 className="text-lg font-bold ">{item?.name}</h1>
                    </DialogClose>
                  </Link>
                ))
              ) : (
                <div>
                  <h1>No user found</h1>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDrawer;
