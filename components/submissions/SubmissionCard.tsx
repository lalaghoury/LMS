"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface SubmissionCardProps {
  batchId: string;
  assignmentId: string;
  submission: any;
  isTeacher: boolean;
  route: string;
}

const SubmissionCard = ({
  batchId,
  assignmentId,
  submission,
  isTeacher = false,
  route,
}: SubmissionCardProps) => {
  return (
    <div className="flex flex-col w-full space-y-1" key={submission._id}>
      <h1 className="text-sm font-bold">
        Submitted By: {submission.studentId.name}
      </h1>

      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300">
            <Image
              src={submission.assignmentId.teacherId.avatar}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">
              {submission.assignmentId.teacherId.name}
            </p>
            <p className="text-sm text-gray-500">
              {submission.assignmentId.teacherId.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2">
          <Link
            href={`/batches/${route}/${batchId}/assignments/${assignmentId}/submissions/${submission._id}`}
          >
            <Button>View Submission Details</Button>
          </Link>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default SubmissionCard;
