import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { studentsThunks } from "@/lib/features/students/studentsThunks";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";

interface AddNewStudentsDialogProps {
  setAddNewStudentsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addNewStudentsDialog: boolean;
  batchId: string;
}

const AddNewStudentsDialog: React.FC<AddNewStudentsDialogProps> = ({
  setAddNewStudentsDialog,
  addNewStudentsDialog,
  batchId,
}) => {
  const [emails, setEmails] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, code }: any = useAppSelector((state) => state.students);

  useEffect(() => {
    dispatch(studentsThunks.generateInviteCode({ batchId }));
  }, [batchId, dispatch]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        alert("Link copied!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleAddRecipientsDispatch = () => {
    dispatch(studentsThunks.inviteStudents({ emails, router, batchId }));
  };

  return (
    <Dialog
      open={addNewStudentsDialog}
      onOpenChange={() => setAddNewStudentsDialog(!addNewStudentsDialog)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Invite students</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add new students</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-4">
          <h3>Invitation link</h3>

          <div className="flex gap-1 items-center">
            <Input
              type="text"
              value={code}
              readOnly
              className="w-full px-2 py-1 border rounded-l"
            />
            <ClipboardCopy
              className="w-5 h-5 cursor-pointer"
              onClick={copyToClipboard}
            />
          </div>

          <Separator className="my-4" />
        </div>

        <div className="space-y-2 py-4">
          <form>
            <h3>Email</h3>
            <ReactMultiEmail
              placeholder="Input your email"
              emails={emails}
              onChange={(_emails: string[]) => {
                setEmails(_emails);
              }}
              autoFocus={true}
              getLabel={(email, index, removeEmail) => {
                return (
                  <div data-tag key={index}>
                    <div data-tag-item>{email}</div>
                    <span data-tag-handle onClick={() => removeEmail(index)}>
                      ×
                    </span>
                  </div>
                );
              }}
            />
            <br />
            <Separator className="my-2" />
          </form>
        </div>

        <div className="space-y-2 py-4">
          <Separator className="my-2" />

          <ul className="max-h-40 overflow-y-auto">
            {emails.map((email, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                <span className="mr-2">{email}</span>
                <Trash2
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setEmails(emails.filter((e) => e !== email));
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <Button
            onClick={() => setAddNewStudentsDialog(!addNewStudentsDialog)}
          >
            Cancel
          </Button>
          <Button onClick={handleAddRecipientsDispatch} disabled={loading}>
            {loading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}{" "}
            {loading ? "Inviting ..." : "Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudentsDialog;
