"use client";

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
import { CheckIcon, ClipboardList } from "lucide-react";
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

interface AssignmentCreationDialogProps {
  assDialogOpen: boolean;
  setAssDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssignmentCreationDialog: React.FC<AssignmentCreationDialogProps> = ({
  assDialogOpen,
  setAssDialogOpen,
}) => {
  const [title, setTitle] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [courseId, setCourseId] = useState("1");
  const [teacherId, setTeacherId] = useState("1");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleAssCreation = () => {
    try {
      const formData = new FormData();
      attachments.forEach((file, index) => {
        formData.append(`files`, file);
      });
      formData.append("title", title);
      formData.append("instructions", instructions);
      formData.append("courseId", courseId);
      formData.append("teacherId", teacherId);
      for (const student of selectedStudents) {
        formData.append("students", student);
      }

      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/assignments/new`,
        formData
      );
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <Dialog
      open={assDialogOpen}
      onOpenChange={() => setAssDialogOpen(!assDialogOpen)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add Assignment</Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen overflow-y-scroll max-w-full">
        <DialogHeader className="px-4">
          <DialogTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center ">
              <ClipboardList className="mr-2 h-4 w-4 text-green-500" />{" "}
              Assignment
            </div>

            <Button>Assign</Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-normal text-lg">
                Assignment Details
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Input
                placeholder="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
              />
              <Input
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                type="text"
                className="mt-4"
                name="instructions"
              />
              <div className="mt-4">
                <Label>Attach Files</Label>
                <Input type="file" onChange={handleFileChange} multiple />
                {attachments.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    {attachments.map((file, index) => (
                      <p key={index}>{file.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <SelectStudents
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
        />

        <DialogFooter>
          <Button onClick={() => setAssDialogOpen(!assDialogOpen)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAssCreation}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentCreationDialog;

const SelectStudents = ({
  selectedStudents,
  setSelectedStudents,
}: {
  selectedStudents: string[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleSelectStudent = (studentId: string) => {
    if (!selectedStudents.includes(studentId)) {
      setSelectedStudents((prev) => [...prev, studentId]);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-normal text-lg">Select Students</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Class</Label>
              <Command>
                <CommandInput placeholder={"Search Students..."} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <>
                    {students.map((student) => (
                      <CommandItem
                        key={student.id}
                        // value={student.id}
                        onSelect={() => handleSelectStudent(student.id)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            selectedStudents.includes(student.id)
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>

                        <span>{student.name}</span>
                      </CommandItem>
                    ))}
                  </>

                  {selectedStudents.length > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem
                          className="justify-center text-center"
                          onSelect={() => setSelectedStudents([])}
                        >
                          Deselect All
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
