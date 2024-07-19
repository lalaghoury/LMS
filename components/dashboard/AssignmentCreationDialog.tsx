"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
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
import { CheckIcon, ClipboardList, Trash2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { assignmentThunks } from "@/lib/features/assignments/assignmentThunks";
import { Icons } from "../ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { studentsThunks } from "@/lib/features/students/studentsThunks";

interface AssignmentCreationDialogProps {
  assDialogOpen: boolean;
  setAssDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  batchId: string;
}

const AssignmentCreationDialog: React.FC<AssignmentCreationDialogProps> = ({
  assDialogOpen,
  setAssDialogOpen,
  batchId,
}) => {
  const [title, setTitle] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.assignments);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleAssCreation = async () => {
    const formData = new FormData();
    attachments.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append("title", title);
    formData.append("instructions", instructions);
    for (const student of selectedStudents) {
      formData.append("students", student);
    }

    dispatch(
      assignmentThunks.createAssignment({
        formData,
        router,
        batchId,
      })
    );
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
                <Input
                  type="file"
                  onChange={(e) => {
                    const newAttachments = Array.from(e.target.files!);
                    if (newAttachments.length + attachments.length <= 10) {
                      handleFileChange(e);
                    } else {
                      toast({
                        title: "File Upload Error",
                        description: "You can only upload 10 files ...",
                        variant: "destructive",
                      });
                    }
                  }}
                  multiple
                />
                {attachments.length > 0 && (
                  <div className="mt-2 text-sm space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <p>{file.name}</p>
                        <Trash2
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            setAttachments(
                              attachments.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </div>
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
          batchId={batchId}
        />

        <DialogFooter>
          <Button onClick={() => setAssDialogOpen(!assDialogOpen)}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleAssCreation}>
            {loading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}{" "}
            {loading ? "Assigning..." : "Assign"}
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
  batchId,
}: {
  selectedStudents: string[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
  batchId: string;
}) => {
  const dispatch = useAppDispatch();
  const { loading, students }: { loading: boolean; students: any[] } =
    useAppSelector((state) => state.students);

  useEffect(() => {
    dispatch(studentsThunks.getAllStudentsOfABatch({ batchId }));
  }, [dispatch, batchId]);

  if (loading) return <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />;

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
                        key={student._id}
                        onSelect={() => handleSelectStudent(student._id)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            selectedStudents.includes(student._id)
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
