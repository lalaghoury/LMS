"use client";

import * as React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { GraduationCap, Users, House, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const links = [
    {
      title: "Home",
      label: "",
      icon: House,
      location: "/",
    },
    {
      title: "Teaching",
      label: "",
      icon: Users,
      location: "/batches/teaching",
    },
    {
      title: "Enrolled",
      label: "",
      icon: GraduationCap,
      location: "/batches/enrolled",
    },
  ];

  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <aside
      className={cn(
        "flex flex-col gap-3 p-5 justify-start",
        isCollapsed ? "items-center" : "items-start"
      )}
    >
      <Menu
        className="h-5 w-5 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      {links.map((link, index) =>
        isCollapsed ? (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={link.location} className="flex items-center gap-2">
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.title}</span>
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
          <Link
            key={index}
            href={link.location}
            className="flex items-center gap-2 hover:text-foreground/70"
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span className="ml-auto text-muted-foreground">
                {link.label}
              </span>
            )}
          </Link>
        )
      )}
    </aside>
  );
}
