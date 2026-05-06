"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Edit2, Eye, Trash2, Plus, Loader2, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";

export default function CoverLettersPage() {
  const router = useRouter();
  const [coverLetters, setCoverLetters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const response = await fetch("/api/cover-letters");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched cover letters:", data);
          setCoverLetters(data);
        } else {
          const text = await response.text();
          console.error("Failed to fetch cover letters:", response.status, text);
          if (response.status === 404) {
            setError(text);
          }
        }
      } catch (error) {
        console.error("Error fetching cover letters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetters();
  }, []);

  const handleCreateNew = () => {
    router.push("/cover-letter-builder");
  };

  const handleEdit = () => {
    router.push("/cover-letter-builder");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 md:p-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Cover Letters</h1>
          <p className="text-slate-500 mt-1">Manage and edit your tailored cover letters.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50 mb-8">
          <CardContent className="py-6 text-red-600 font-medium">
            {error}
          </CardContent>
        </Card>
      ) : coverLetters.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-100">
              <Mail className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No cover letters yet</h3>
            <p className="text-slate-500 text-center max-w-xs mb-8">
              Generate tailored cover letters instantly based on your resume.
            </p>
            <Button onClick={handleCreateNew} variant="outline" className="rounded-full px-8">
              Create your first cover letter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverLetters.map((cl) => (
            <Card key={cl.id} className="group border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white flex flex-col">
              <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <div className="absolute inset-0">
                  <CoverLetterPreview data={cl} />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button onClick={handleEdit} className="bg-white text-slate-900 hover:bg-white/90 rounded-full font-bold shadow-xl">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Letter
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
                    <Calendar className="h-3 w-3" />
                    {cl.updated_at ? format(new Date(cl.updated_at), 'MMM dd, yyyy') : 'Recently'}
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cl.recipient?.company ? `Cover Letter: ${cl.recipient.company}` : 'Untitled Cover Letter'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm text-slate-500 line-clamp-2">
                  {cl.content?.body ? cl.content.body.substring(0, 100) + '...' : 'A tailored cover letter built with CV Craft.'}
                </p>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 flex gap-2 mt-auto">
                <Button 
                  onClick={handleEdit}
                  variant="ghost" 
                  className="flex-1 h-10 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-semibold gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  className="h-10 w-10 rounded-lg hover:bg-red-50 hover:text-red-600 text-slate-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
