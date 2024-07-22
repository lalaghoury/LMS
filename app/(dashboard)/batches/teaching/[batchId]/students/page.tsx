"use client";

import { Button } from "@/components/ui/button";
import { studentsThunks } from "@/lib/features/students/studentsThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AllStudentsPageProps {
  params: {
    batchId: string;
  };
}

const AllStudentsPage = ({ params }: AllStudentsPageProps) => {
  const { batchId } = params;
  const dispatch = useAppDispatch();

  const { loading, students, blockedStudents } = useAppSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(studentsThunks.getAllStudentsOfABatch({ batchId }));
    dispatch(studentsThunks.getAllBlockedStudentsOfABatch({ batchId }));
  }, [dispatch, batchId]);

  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="blocked">Blocked</TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        {students?.length > 0 ? (
          <div className="w-full flex flex-wrap gap-2 justify-between items-center max-w-[1200px] mx-auto">
            {students?.map((student) => (
              <div
                key={student?._id}
                className="w-full sm:w-[calc(50%-0.5rem)] md:w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col items-center justify-center p-5">
                  <Image
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={student?.avatar}
                    alt={student?.name}
                    width={96}
                    height={96}
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {student?.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Student
                  </span>
                  <BlockStudentDialog
                    studentId={student?._id}
                    batchId={batchId}
                    studentName={student?.name}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="w-full flex flex-wrap gap-2 justify-between items-center max-w-[1200px] mx-auto">
              <p>No students</p>
            </div>
          </>
        )}
      </TabsContent>
      <TabsContent value="blocked">
        {blockedStudents?.length > 0 ? (
          <div className="w-full flex flex-wrap gap-2 justify-between items-center max-w-[1200px] mx-auto">
            {blockedStudents?.map((obj) => {
              const student = obj?.blockedUser;
              const blockedBy = obj?.blockedBy;

              return (
                <div
                  key={student?._id}
                  className="w-full sm:w-[calc(50%-0.5rem)] md:w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex flex-col items-center justify-center p-5">
                    <p className="text-sm bold mb-2">
                      {obj?.note
                        ? obj?.note
                        : `${blockedBy?.name} on${" "}
                    ${new Date(obj?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}`}
                    </p>

                    <Image
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={student?.avatar}
                      alt={student?.name}
                      width={96}
                      height={96}
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {student?.name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Student
                    </span>
                    <UnBlockStudentDialog
                      studentId={student?._id}
                      batchId={batchId}
                      studentName={student?.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="w-full flex flex-wrap gap-2 justify-between items-center max-w-[1200px] mx-auto">
              <p>No blocked students</p>
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};

function UnBlockStudentDialog({
  studentId,
  studentName,
  batchId,
}: {
  studentId: string;
  studentName: string;
  batchId: string;
}) {
  const dispatch = useAppDispatch();

  const handleStudentBlock = () => {
    dispatch(studentsThunks.unblockStudent({ batchId, studentId }));
    // dispatch(studentsThunks.getAllBlockedStudentsOfABatch({ batchId }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="mt-2">
        <Button variant="outline">Unblock</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            You are gonna unblock {studentName}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={handleStudentBlock}
              type="button"
              variant="outline"
            >
              Unblock
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BlockStudentDialog({
  studentId,
  studentName,
  batchId,
}: {
  studentId: string;
  studentName: string;
  batchId: string;
}) {
  const dispatch = useAppDispatch();
  const [note, setNote] = useState("");

  const handleStudentBlock = () => {
    dispatch(studentsThunks.blockStudent({ batchId, studentId, note }));
    // dispatch(studentsThunks.getAllStudentsOfABatch({ batchId }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="mt-2">
        <Button variant="outline">Block</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            You are gonna block {studentName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={handleStudentBlock}
              type="button"
              variant="destructive"
            >
              Block
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default AllStudentsPage;
