"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { chartThunks } from "@/lib/features/charts/chartThunks";


const chartConfig = {
  students: {
    label: "Students",
    color: "#2563eb",
  },
  assignments: {
    label: "Assignments",
    color: "#60a5fa",
  },
  submissions: {
    label: "Submissions",
    color: "#fbbf24",
  },
} satisfies ChartConfig;

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { assignments, batches, submissions } = useAppSelector(
    (state) => state.chart
  );

  useEffect(() => {
    dispatch(chartThunks.initialize());
  }, [dispatch]);

  const chartData = batches.map(({ _id, name, students }) => {
    return {
      batch: name,
      students: students.length,
      assignments: assignments.filter((assignment) => assignment.batchId === _id).length,
      submissions: submissions.filter((submission) => submission.batchId === _id).length,
    };
  });
  

  return (
    <div>
      <h1>Your Batches Chart</h1>
      <ChartContainer config={chartConfig} className="min-h-[500px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="batch"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="students" fill="var(--color-students)" radius={4} />
          <Bar
            dataKey="assignments"
            fill="var(--color-assignments)"
            radius={4}
          />
          <Bar
            dataKey="submissions"
            fill="var(--color-submissions)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
