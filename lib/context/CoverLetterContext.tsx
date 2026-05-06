"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export type CoverLetterData = {
  sender: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
  };
  recipient: {
    name: string;
    company: string;
    address: string;
    jobTitle: string;
  };
  content: {
    body: string;
  };
  settings: {
    templateId: string;
    color: string;
  };
};

type CoverLetterContextType = {
  coverLetterData: CoverLetterData;
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterData>>;
  updateSection: (section: keyof CoverLetterData, data: any) => void;
  loading: boolean;
  refreshData: () => Promise<void>;
};

const defaultCoverLetterData: CoverLetterData = {
  sender: {
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
  },
  recipient: {
    name: "",
    company: "",
    address: "",
    jobTitle: "",
  },
  content: {
    body: "",
  },
  settings: {
    templateId: "classic",
    color: "#3b82f6",
  },
};

export const CoverLetterContext = createContext<CoverLetterContextType | undefined>(undefined);

export function CoverLetterProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(defaultCoverLetterData);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/cover-letter/get?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCoverLetterData({
            sender: data.sender || defaultCoverLetterData.sender,
            recipient: data.recipient || defaultCoverLetterData.recipient,
            content: data.content || defaultCoverLetterData.content,
            settings: data.settings || defaultCoverLetterData.settings,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching cover letter:", error);
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

  const updateSection = (section: keyof CoverLetterData, data: any | ((prev: any) => any)) => {
    setCoverLetterData((prev) => {
      const newData = typeof data === "function" ? data(prev[section]) : data;
      return {
        ...prev,
        [section]: newData,
      };
    });
  };

  return (
    <CoverLetterContext.Provider value={{ coverLetterData, setCoverLetterData, updateSection, loading, refreshData }}>
      {children}
    </CoverLetterContext.Provider>
  );
}

export function useCoverLetter() {
  const context = useContext(CoverLetterContext);
  if (context === undefined) {
    throw new Error("useCoverLetter must be used within a CoverLetterProvider");
  }
  return context;
}
