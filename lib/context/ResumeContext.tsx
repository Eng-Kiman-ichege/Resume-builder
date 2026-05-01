"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export type ResumeData = {
  header: any;
  experience: any[];
  education: any[];
  skills: { content: string };
  summary: { content: string };
  additional: any[];
  settings: {
    color: string;
    titleColor: string;
    backgroundColor: string;
    templateId: string;
  };
};

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateSection: (section: keyof ResumeData, data: any) => void;
  loading: boolean;
  refreshData: () => Promise<void>;
};

const defaultResumeData: ResumeData = {
  header: {},
  experience: [],
  education: [],
  skills: { content: "" },
  summary: { content: "" },
  additional: [],
  settings: {
    color: "#3b82f6",
    titleColor: "#0f172a", // Slate 900
    backgroundColor: "#ffffff",
    templateId: "classic",
  },
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/resume/get?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setResumeData({
            header: data.header || {},
            experience: data.experience || [],
            education: data.education || [],
            skills: data.skills || { content: "" },
            summary: data.summary || { content: "" },
            additional: data.additional || [],
            settings: data.settings || { 
              color: "#3b82f6", 
              titleColor: "#0f172a", 
              backgroundColor: "#ffffff", 
              templateId: "classic" 
            },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      refreshData();
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [isLoaded, user]);

  const updateSection = (section: keyof ResumeData, data: any | ((prev: any) => any)) => {
    setResumeData((prev) => {
      const newData = typeof data === "function" ? data(prev[section]) : data;
      return {
        ...prev,
        [section]: newData,
      };
    });
  };


  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateSection, loading, refreshData }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
