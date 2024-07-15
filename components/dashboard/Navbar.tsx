"use client";

import React from "react";
import { Menu, School } from "lucide-react";
import Link from "next/link";
import { PopoverToJoinOrCreateABatch, UserPopup } from "@/components/dashboard";
import { ModeToggle } from "@/theme/themeToggle";

export const Navbar = ({
  setIsCollapsed,
  isCollapsed,
}: {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
}) => {
  return (
    <header className="w-full min-h-10  flex items-center justify-between bg-background">
      <div className="flex items-center space-x-3">
        <Menu
          className="cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
        <Link href="/dashboard" className="flex space-x-2 items-center">
          <School className="h-4 w-4" />
          <span>LMS</span>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <PopoverToJoinOrCreateABatch />

        <ModeToggle />

        <UserPopup />
      </div>
    </header>
  );
};
