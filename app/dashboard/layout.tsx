"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
      <aside className="hidden md:flex w-24 border-r border-slate-200 flex-col items-center py-8 gap-10 bg-slate-50">
        <Link href="/dashboard" className="mb-2">
          <Image 
            src="/logo.png" 
            alt="CV Craft Logo" 
            width={48} 
            height={48} 
            className="rounded-xl shadow-sm hover:scale-105 transition-transform"
          />
        </Link>
        <div className="flex flex-col items-center gap-8 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 group w-full transition-colors px-2 py-2 rounded-lg ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-[10px] font-medium uppercase tracking-tight text-center">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/dashboard"
          className="mt-4 flex flex-col items-center gap-1 group w-full transition-colors px-2 py-2 rounded-lg"
        >
          <div className="bg-green-300 hover:bg-green-400 transition-colors p-3 rounded-lg text-green-900 shadow-sm">
            <Plus className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tight text-slate-800 text-center">
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 flex items-center justify-around px-1 py-1 safe-bottom shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-2 transition-colors rounded-lg flex-1 ${
                isActive ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[9px] font-semibold">{item.name}</span>
            </Link>
          );
        })}
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg flex-1 hover:bg-slate-50 transition-colors"
        >
          <div className="bg-green-300 p-2 rounded-lg text-green-900">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-[9px] font-semibold text-slate-600">New</span>
        </Link>
        <div className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg flex-1">
          <UserButton />
        </div>
      </nav>
    </div>
  );
}
