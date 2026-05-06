"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Edit2, Eye, Trash2, Plus, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ResumePreview } from "@/components/ResumePreview";

export default function ResumesPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("/api/resumes");
        if (response.ok) {
          const data = await response.json();
          setResumes(data);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleEdit = (id: string) => {
    // For now, our builder only handles one resume at a time without an ID in the URL
    // But we'll redirect to the builder
    router.push("/builder");
  };

  const handleCreateNew = () => {
    router.push("/builder");
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Resumes</h1>
          <p className="text-slate-500 mt-1">Manage and edit your professional resumes.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-100">
              <FileText className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No resumes yet</h3>
            <p className="text-slate-500 text-center max-w-xs mb-8">
              Start building your professional resume with our AI-powered builder.
            </p>
            <Button onClick={handleCreateNew} variant="outline" className="rounded-full px-8">
              Build your first resume
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id || 'single'} className="group border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white flex flex-col">
              <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <div className="absolute inset-0">
                  <ResumePreview data={resume} />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button onClick={() => handleEdit(resume.id)} className="bg-white text-slate-900 hover:bg-white/90 rounded-full font-bold shadow-xl">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Resume
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
                    <Calendar className="h-3 w-3" />
                    {resume.updated_at ? format(new Date(resume.updated_at), 'MMM dd, yyyy') : 'Recently'}
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {resume.header?.firstName ? `${resume.header.firstName}'s Resume` : 'Untitled Resume'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm text-slate-500 line-clamp-2">
                  {resume.summary?.content || 'A professional resume built with CV Craft.'}
                </p>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 flex gap-2 mt-auto">
                <Button 
                  onClick={() => handleEdit(resume.id)} 
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
