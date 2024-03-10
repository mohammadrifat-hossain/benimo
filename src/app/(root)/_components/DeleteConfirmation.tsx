import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteConfirmationProps{
  postId: string
}

const DeleteConfirmation = ({postId}:DeleteConfirmationProps) => {
  const {push, refresh} = useRouter()

  const handleDelete = async () => {
    const {data} = await axios.delete(`/api/deletepost/${postId}`)
    if(data.success){
      toast({
        title: data?.message
      })
      refresh()
      push('/')
    }else{
      toast({
        title: data?.message
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <button className="flex items-center justify-start gap-2 hover:bg-[#aaaaaa38] transition-all w-full">
          <Trash2 />
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this post ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleted post will no longer visible to anyone. It will be
            permanently deleted from database{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <button onClick={handleDelete}>Continue</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
