"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Save, Layout, CheckCircle2, FileText, Upload, X, File, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TEMPLATES as initialTemplates } from "@/lib/templates";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ id: "", name: "" });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates");
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.map((t: any) => ({
          ...t,
          isPdf: t.is_pdf,
          fileName: t.file_name,
          fileSize: t.file_size
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      
      // Create preview URLs
      const urls: Record<string, string> = {};
      files.forEach(file => {
        urls[file.name] = URL.createObjectURL(file);
      });
      setFileUrls(prev => ({ ...prev, ...urls }));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAdd = async () => {
    if (selectedFiles.length === 0) return;
    setSaving(true);

    try {
      const uploadResults = await Promise.all(selectedFiles.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${index}.${fileExt}`;
        const filePath = `pdf/${fileName}`;

        // 1. Upload file to Supabase Storage
        const { data: storageData, error: storageError } = await supabase.storage
          .from('templates')
          .upload(filePath, file);

        if (storageError) throw storageError;

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('templates')
          .getPublicUrl(filePath);

        return {
          id: newTemplate.id || `${Date.now()}-${index}`,
          name: selectedFiles.length > 1 ? `${newTemplate.name || "Template"} ${index + 1}` : (newTemplate.name || file.name.replace(".pdf", "")),
          thumbnail: publicUrl,
          isPdf: true,
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(1) + " KB"
        };
      }));

      // 3. Save metadata to database
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templates: uploadResults })
      });
      
      if (res.ok) {
        setTemplates(prev => [...prev, ...uploadResults]);
        setNewTemplate({ id: "", name: "" });
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Make sure you created the 'templates' bucket in Supabase and set the policies.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete this template.")) return;
    
    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: "DELETE"
      });
      
      if (res.ok) {
        setTemplates(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Template Vault</h1>
            <p className="text-slate-600 dark:text-slate-400">Upload and manage professional PDF resume templates.</p>
          </div>
          <div className="flex gap-4 items-center">
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 font-bold rounded-full px-6"
              onClick={async () => {
                if (confirm("Are you sure? This will delete EVERY template from the database.")) {
                  setSaving(true);
                  try {
                    await Promise.all(templates.map(t => fetch(`/api/templates/${t.id}`, { method: "DELETE" })));
                    setTemplates([]);
                  } finally {
                    setSaving(false);
                  }
                }
              }}
            >
              Clear All Templates
            </Button>
            <div className="bg-red-600/10 text-red-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-red-600/20">
              <FileText className="h-4 w-4" /> {templates.length} PDF Templates
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Template Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-zinc-800 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" /> Upload Templates
              </h2>
              
              <div className="space-y-5">
                {/* Custom File Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Click to upload PDFs</p>
                    <p className="text-xs text-slate-500 mt-1">Select multiple files from your PC</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple 
                    accept=".pdf"
                    className="hidden"
                  />
                </div>

                {/* Selected Files List */}
                <AnimatePresence>
                  {selectedFiles.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar"
                    >
                      {selectedFiles.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700">
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="h-5 w-5 text-red-500 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Template ID Prefix (Optional)</label>
                    <Input 
                      placeholder="e.g. modern_clean" 
                      value={newTemplate.id}
                      onChange={(e) => setNewTemplate({...newTemplate, id: e.target.value})}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Group Name (Optional)</label>
                    <Input 
                      placeholder="e.g. Modern Clean" 
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAdd}
                  disabled={selectedFiles.length === 0 || saving}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl mt-4 font-bold text-lg shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    `Confirm & Add ${selectedFiles.length > 0 ? `(${selectedFiles.length} Files)` : ""}`
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Existing Templates Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template: any) => (
                <div 
                  key={template.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[1/1.414] relative overflow-hidden bg-slate-100 dark:bg-zinc-950">
                    {/* Real PDF Preview */}
                    {template.thumbnail ? (
                      <iframe 
                        src={template.thumbnail + "#toolbar=0&navpanes=0&scrollbar=0"} 
                        className="w-full h-full border-none pointer-events-none"
                        title={template.name}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <FileText className="h-20 w-20 text-red-500 opacity-20" />
                        <p className="text-xs text-slate-400">PDF Metadata Only</p>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 backdrop-blur-[1px]">
                      <div className="flex gap-2">
                        <Button 
                          variant="secondary" 
                          className="flex-1 h-12 rounded-xl font-bold"
                          onClick={() => setViewingPdf(template.thumbnail)}
                        >
                          View Full PDF
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-12 w-12 rounded-xl"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50 border-t border-slate-100 dark:border-zinc-800">
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">{template.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 font-mono truncate">{template.id}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Ready to Edit</span>
                      </div>
                    </div>
                    <div className="bg-green-500/10 text-green-500 p-2 rounded-full border border-green-500/20 shadow-sm shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}

              {templates.length === 0 && (
                <div className="col-span-2 h-[600px] border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-slate-400 bg-white/50 dark:bg-zinc-900/50">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                    <File className="h-10 w-10 opacity-20" />
                  </div>
                  <p className="font-bold text-lg">No templates added yet</p>
                  <p className="text-sm mt-1">Upload PDF files from your PC to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        {/* PDF Viewer Modal */}
        <AnimatePresence>
          {viewingPdf && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
              onClick={() => setViewingPdf(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-5xl h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4 z-10">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full shadow-lg"
                    onClick={() => setViewingPdf(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <iframe src={viewingPdf} className="w-full h-full border-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
