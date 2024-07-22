"use client";

import React from "react";
import { School } from "lucide-react";
import Link from "next/link";
import { PopoverToJoinOrCreateABatch, UserPopup } from "@/components/dashboard";
import { ModeToggle } from "@/theme/themeToggle";

export const Navbar = () => {
  return (
    <header className="w-full h-10 flex items-center justify-between bg-background px-4 mt-3">
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex space-x-2 items-center">
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
