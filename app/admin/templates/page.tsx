"use client";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Save, Layout, CheckCircle2, File, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { templates as initialTemplates } from "@/lib/templates";

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [newTemplate, setNewTemplate] = useState({ id: "", name: "", thumbnail: "", isPdf: false });

  const handleAdd = () => {
    if (!newTemplate.id || !newTemplate.name) return;
    setTemplates([...templates, { ...newTemplate, id: newTemplate.id || Date.now().toString() }]);
    setNewTemplate({ id: "", name: "", thumbnail: "", isPdf: false });
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Template Manager</h1>
            <p className="text-slate-600 dark:text-slate-400">Add or remove resume templates available to users.</p>
          </div>
          <div className="bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-blue-600/20">
            <Layout className="h-4 w-4" /> {templates.length} Templates Active
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Template Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-500" /> Add New Template
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Template ID</label>
                  <Input 
                    placeholder="e.g. modern_clean" 
                    value={newTemplate.id}
                    onChange={(e) => setNewTemplate({...newTemplate, id: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Display Name</label>
                  <Input 
                    placeholder="e.g. Modern Clean" 
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Thumbnail URL</label>
                  <Input 
                    placeholder="https://images.unsplash.com/..." 
                    value={newTemplate.thumbnail}
                    onChange={(e) => setNewTemplate({...newTemplate, thumbnail: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700">
                  <input 
                    type="checkbox" 
                    id="isPdf" 
                    checked={newTemplate.isPdf}
                    onChange={(e) => setNewTemplate({...newTemplate, isPdf: e.target.checked})}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPdf" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                    <FileText className="h-4 w-4 text-red-500" /> PDF Template Source
                  </label>
                </div>
                <Button 
                  onClick={handleAdd}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl mt-4"
                >
                  Create Template
                </Button>
              </div>

              {newTemplate.thumbnail && (
                <div className="mt-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Thumbnail Preview</label>
                  <div className="aspect-[1/1.414] rounded-lg border-2 border-dashed border-slate-200 dark:border-zinc-800 overflow-hidden bg-slate-50 dark:bg-zinc-950 flex items-center justify-center">
                    <img 
                      src={newTemplate.thumbnail} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/400x600?text=Invalid+URL")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Existing Templates Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden group hover:shadow-xl transition-all"
                >
                  <div className="aspect-[1/1.414] relative overflow-hidden bg-slate-100 dark:bg-zinc-950">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    {template.isPdf && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
                        <FileText className="h-3 w-3" /> PDF
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <div className="flex gap-2">
                        <Button variant="secondary" className="flex-1 h-10 rounded-lg">Edit</Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-10 w-10 rounded-lg"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{template.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">{template.id}</p>
                    </div>
                    <div className="bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}

              {templates.length === 0 && (
                <div className="col-span-2 h-96 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                  <p className="font-medium">No templates added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
