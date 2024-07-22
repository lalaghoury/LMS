"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface AssignmentCardProps {
  batchId: string;
  assignment: any;
  isTeacher: boolean;
  route: string;
}

const AssignmentCard = ({
  batchId,
  assignment,
  isTeacher,
  route,
}: AssignmentCardProps) => {
  return (
    <div
      key={assignment?._id}
      className="mb-4 space-y-4 p-5 rounded-sm min-h-[280px] border-secondary border"
    >
      <h1 className="text-2xl font-bold">{assignment?.title?.toUpperCase()}</h1>

      <div className="border-b border-gray-300" />

      <div className="flex flex-col gap-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-300">
            <Image
              src={assignment?.teacherId.avatar}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Sir: {assignment?.teacherId.name}</p>
            <p className="text-sm text-gray-500">
              {/* {assignment?.teacherId.email} */}
              Author
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-between">
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: assignment?.instructions
                ? `${assignment?.instructions.substring(0, 150)}${
                    assignment?.instructions.length > 150 ? "..." : ""
                  }`
                : "",
            }}
          />

          <div className="flex gap-2 items-center">
            <Link
              href={`/batches/${route}/${batchId}/assignments/${assignment?._id}`}
            >
              <Button>View Details</Button>
            </Link>
            {isTeacher && (
              <Link
                href={`/batches/${route}/${batchId}/assignments/${assignment?._id}/submissions`}
              >
                <Button>View Submissions</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
