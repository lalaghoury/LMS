"use client";

import { messageError } from "@/components/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { assignmentThunks } from "@/lib/features/assignments/assignmentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

interface AssignmentDetailsPageProps {
  params: {
    assignmentId: string;
    batchId: string;
  };
}

const AssignmentDetailsPage = ({ params }: AssignmentDetailsPageProps) => {
  const { assignmentId, batchId } = params;
  const [attachments, setAttachments] = useState<File[]>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, singleAssignment: assignment }: any = useAppSelector(
    (state) => state.assignments
  );

  useEffect(() => {
    dispatch(
      assignmentThunks.getAnAssignmentById({
        assignmentId,
        batchId,
        route: "enrolled",
      })
    );
  }, [assignmentId, dispatch]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleAssSubmission = () => {
    const formData = new FormData();
    attachments.forEach((file) => {
      formData.append(`files`, file);
    });

    dispatch(
      assignmentThunks.handInAsignment({
        formData,
        router,
        assignmentId,
        batchId,
      })
    );

    setAttachments([]);
  };

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="flex items-start justify-between w-full gap-5">
      <div className="flex flex-col w-full h-screen px-3 space-y-4">
        <div className="py-2 border-b border-gray-300">
          <h1 className="text-2xl font-bold">{assignment?.title}</h1>
        </div>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-300">
              <Image
                src={assignment?.teacherId?.avatar}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{assignment?.teacherId?.name}</p>
              <p className="text-sm text-gray-500">
                {/* {assignment?.teacherId?.email} */}
                Author
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Instructions: </h1>
          <p className="whitespace-pre-wrap">{assignment.instructions}</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center space-y-4">
        <div className="flex items-center gap-2">
          {assignment?.attachments.length > 0 && (
            <div className="flex items-start justify-center flex-col gap-2">
              <p className="text-sm font-bold">Attachments:</p>
              {assignment?.attachments.map((attachment: any, index: number) => (
                <a
                  key={index}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {attachment.fileName}
                </a>
              ))}
            </div>
          )}
        </div>

        {assignment?.isSubmitted ? (
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-bold">You are done</h1>
            <Link
              href={`/batches/enrolled/${batchId}/assignments/${assignmentId}/submitted`}
            >
              <Button>View Submission Details</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <Label>Attach Files</Label>
              <Input
                type="file"
                onChange={(e) => {
                  const newAttachments = Array.from(e.target.files!);
                  if (newAttachments.length + attachments.length <= 10) {
                    handleFileChange(e);
                  } else {
                    messageError("You can only upload 10 files ...");
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

            <Button
              onClick={handleAssSubmission}
              disabled={attachments.length === 0 || loading}
            >
              {loading && <Icons.spinner className="w-5 h-5 animate-spin" />}
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetailsPage;
