"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, TextField } from "@mui/material";
import { Search, UserRoundSearch } from "lucide-react";

const SearchDrawer = () => {
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
            />
            <button className="px-2 md:px-5 py-1.5  rounded-full border flex items-center gap-2 hover:shadow-md text-slate-500 hover:text-slate-900 transition-all">
              <Search />
              Search
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDrawer;
