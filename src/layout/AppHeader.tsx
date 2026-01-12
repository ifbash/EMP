// components/layout/AppHeader.tsx
"use client";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";



export default function AppHeader() {
  const {
    isNavigatorOpen,
    setIsNavigatorOpen,
    isNavigatorPinned
  } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-14 lg:h-16 items-center justify-between px-4 lg:px-6 relative">
        {/* Logo + All button */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo/logo.svg" alt="Logo" width={140} height={36} className="dark:hidden" priority />
            <Image src="/images/logo/logo-dark.svg" alt="Logo" width={140} height={36} className="hidden dark:block" priority />
          </Link>

          <button
            onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
            onMouseDown={(e) => e.stopPropagation()}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${isNavigatorOpen || isNavigatorPinned ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}
            `}
          >
            All
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}