"use client";

import { Navbar, SidebarNav } from "@/components/dashboard";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbWithCustomSeparator } from "@/components/dashboard/Breadcrumb";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <main className="min-h-screen w-full p-3">
      <Navbar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
      <Separator className="mt-4" />

      <BreadcrumbWithCustomSeparator />
      <Separator className="mt-4" />

      <div className="w-full flex mt-5">
        <SidebarNav isCollapsed={isCollapsed} />
        <Separator orientation="vertical" className="h-screen mr-2" />
        {children}
      </div>
    </main>
  );
}
