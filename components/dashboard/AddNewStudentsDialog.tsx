import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckIcon, ClipboardList, ClipboardCopy } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { students } from "@/constants/CreateBatch";
import { cn } from "@/lib/utils";
import axios from "axios";
import { messageSuccess } from "../message";
import { Separator } from "../ui/separator";

interface AddNewStudentsDialogProps {
  setAddNewStudentsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addNewStudentsDialog: boolean;
}

const AddNewStudentsDialog: React.FC<AddNewStudentsDialogProps> = ({
  setAddNewStudentsDialog,
  addNewStudentsDialog,
}) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const copyToClipboard = ({ linkToCopy }: { linkToCopy: string }) => {
    navigator.clipboard.writeText(linkToCopy).then(
      () => {
        alert("Link copied!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleAddRecipients = () => {
    const newRecipients = inputValue.split(",").map((email) => email.trim());
    if (recipients.length + newRecipients.length > 5) {
      alert("You can only add up to 5 recipients.");
    } else {
      setRecipients([...recipients, ...newRecipients]);
      setInputValue("");
    }
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
            <input
              type="text"
              value="https://classroom.google.com/c/Njk4MjIwMjUzMjM0?c=clhbz..."
              readOnly
              className="w-full px-2 py-1 border rounded-l"
            />
            <ClipboardCopy
              className="w-5 h-5 cursor-pointer"
              onClick={() =>
                copyToClipboard({
                  linkToCopy:
                    "https://classroom.google.com/c/Njk4MjIwMjUzMjM0?cjc=clhbzjd",
                })
              }
            />
          </div>

          <Separator className="my-4" />
        </div>

        <div className="space-y-2 py-4">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type email addresses, separated by commas"
            className="w-full px-2 py-1 mb-4 border rounded"
          />
          <Separator className="my-4" />
          <button
            onClick={(event) => {
              {
                handleAddRecipients;
              }
            }}
            className="w-full px-2 py-1 mb-4 bg-green-500 text-white rounded"
          >
            Add Recipients
          </button>
        </div>

        <div className="space-y-2 py-4">
          <ul className="max-h-40 overflow-y-auto">
            {recipients.map((recipient, index) => (
              <li
                key={index}
                className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                <span className="mr-2">{recipient}</span>
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
          <Button type="submit">Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudentsDialog;
