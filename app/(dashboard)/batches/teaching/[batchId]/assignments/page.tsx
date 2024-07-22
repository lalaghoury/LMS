"use client";

import AssignmentCard from "@/components/assignments/AssignmentCard";
import { assignmentThunks } from "@/lib/features/assignments/assignmentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";

interface AllAssignmentsPageProps {
  params: {
    batchId: string;
  };
}

const AllAssignmentsPage = ({ params }: AllAssignmentsPageProps) => {
  const { batchId } = params;

  const dispatch = useAppDispatch();
  const { assignments }: any = useAppSelector((state) => state.assignments);

  useEffect(() => {
    dispatch(assignmentThunks.getAllAssignmentsByBatchId({ batchId }));
  }, [batchId, dispatch]);

  if (assignments.length === 0) {
    return <div>Assignments not found</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen px-2">
      {assignments.map((assignment: any) => (
        <AssignmentCard
          key={assignment._id}
          assignment={assignment}
          route="teaching"
          isTeacher
          batchId={batchId}
        />
      ))}
    </div>
  );
};

export default AllAssignmentsPage;
