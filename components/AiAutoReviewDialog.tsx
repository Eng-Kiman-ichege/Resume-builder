import { X, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiAutoReviewDialog({ 
  isOpen, 
  onClose, 
  suggestions, 
  onApply 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  suggestions: any[];
  onApply: (suggestion: any, index: number) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-zinc-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Resume Enhancements</h2>
              <p className="text-xs font-medium text-slate-500">Review and apply suggested improvements</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {(!suggestions || suggestions.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">No suggestions at this time. Your resume looks great!</p>
            </div>
          ) : (
            suggestions.map((suggestion, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-slate-50 dark:bg-zinc-950/50 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                        {suggestion.section}
                      </span>
                      {suggestion.index !== undefined && (
                        <span className="text-[10px] font-bold text-slate-500">Item #{suggestion.index + 1}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {suggestion.reason}
                    </p>
                  </div>
                  <Button 
                    onClick={() => onApply(suggestion, idx)}
                    size="sm"
                    className="shrink-0 gap-1.5 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4" /> Apply
                  </Button>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-900">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Proposed Update:</h4>
                  <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-medium leading-relaxed">
                    {suggestion.proposedContent}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/50 flex justify-end">
          <Button variant="outline" onClick={onClose} className="font-semibold">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
