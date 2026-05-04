"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FileText, Mail, Plus, UserCircle } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Resumes",
      href: "/dashboard/resumes",
      icon: FileText,
    },
    {
      name: "Cover Letters",
      href: "/dashboard/cover-letters",
      icon: Mail,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-24 border-r border-slate-200 flex-col items-center py-8 gap-10">
        <div className="flex flex-col items-center gap-8 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 group w-full transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-[10px] font-medium uppercase tracking-tight">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/dashboard"
          className="mt-4 flex flex-col items-center gap-1 group w-full"
        >
          <div className="bg-green-300 hover:bg-green-400 transition-colors p-3 rounded-lg text-green-900 shadow-sm">
            <Plus className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tight text-slate-800">
            Create new
          </span>
        </Link>

        <div className="mt-auto pb-4">
          <UserButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 flex items-center justify-around px-4 py-2 safe-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
                isActive ? "text-blue-600" : "text-slate-400"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold">{item.name}</span>
            </Link>
          );
        })}
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-0.5 py-1 px-3"
        >
          <div className="bg-green-300 p-2 rounded-lg text-green-900">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-600">New</span>
        </Link>
        <div className="flex flex-col items-center gap-0.5 py-1 px-3">
          <UserButton />
          <span className="text-[10px] font-semibold text-slate-400">Account</span>
        </div>
      </nav>
    </div>
  );
}
