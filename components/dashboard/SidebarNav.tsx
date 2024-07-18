"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { GraduationCap, Users, House } from "lucide-react";

export function SidebarNav({ isCollapsed }: { isCollapsed: boolean }) {
  const links = [
    {
      title: "Home",
      label: "",
      icon: House,
      location: "/dashboard",
    },
    {
      title: "Teaching",
      label: "",
      icon: Users,
      location: "/dashboard/batches/teaching",
    },
    {
      title: "Enrolled",
      label: "",
      icon: GraduationCap,
      location: "/dashboard/batches/enrolled",
    },
  ];

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 px-4 py-2 bg-background data-[collapsed=true]:px-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={link.location}>
                    <Button>
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 bg-popover text-sm text-popover-foreground p-2"
                >
                  {link.title}
                  {link.label && <span className="ml-auto">{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link key={index} href={link.location}>
              <Button
                className={"flex items-center gap-2 justify-start w-full"}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </Button>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
