import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { ClipboardCopy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Card } from "@/components/ui/card";

interface BatchesCardProps {
  batch: any;
  isTeacher?: boolean;
  route: string;
}

const BatchesCard = ({ batch, isTeacher = false, route }: BatchesCardProps) => {
  return (
    <Card
      className="md:w-[400px] h-[350px] bg-background rounded-xl w-full flex flex-col gap-3"
      key={batch?._id}
    >
      <Image
        src={`https://picsum.photos/1200/300/?${batch?.name}`}
        alt={batch?.name}
        width={1200}
        height={160}
        className="rounded-xl !object-cover !h-40"
      />
      <div className="flex flex-col gap-4 p-3">
        <Link
          href={`/batches/${route}/${batch?._id}`}
          // className="text-sm font-semibold px-4 py-3 bg-blue-600 rounded-lg"
        >
          <h1 className="text-2xl font-bold hover:underline cursor-pointer">
            {batch?.name}
          </h1>
        </Link>

        {/* <p className="text-sm font-semibold">Created by: {batch?.room}</p> */}

        {/* <p className="text-sm font-semibold">Created by: {batch?.owner?.name}</p> */}
        {/* <p className="text-sm font-semibold">
          No of students: {batch?.students?.length}
        </p> */}

        {isTeacher && (
          <div className="flex gap-1 items-center px-2 pr-3">
            <p className="text-sm font-semibold">Code: </p>

            <Input defaultValue={batch.batchCode} readOnly={true} />

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <ClipboardCopy
                    onClick={() =>
                      navigator.clipboard.writeText(batch.batchCode)
                    }
                    className="h-6 w-6 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 bg-popover text-sm text-popover-foreground p-2"
                >
                  Copy
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <Link href={`/batches/${route}/${batch?._id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
          <Link
            href={`/batches/${route}/${batch?._id}/assignments`}
            className="w-full"
          >
            <Button className="w-full">View Assignments</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BatchesCard;
