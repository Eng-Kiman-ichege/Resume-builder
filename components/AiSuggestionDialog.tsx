"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AiSuggestionDialog({
  isOpen,
  onClose,
  suggestion,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  suggestion: string;
  onApply?: (suggestion: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-blue-600 dark:text-blue-400">
            <Sparkles className="h-5 w-5" />
            AI Suggestions
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Review the suggestions below. You can copy the text or apply it directly if applicable.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg border border-slate-100 dark:border-zinc-800 max-h-[60vh] overflow-y-auto">
          <div className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
            {suggestion || "No suggestions available."}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="text-slate-600">
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy to Clipboard"}
          </Button>
          {onApply && (
            <Button
              onClick={() => {
                onApply(suggestion);
                onClose();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Check className="h-4 w-4" />
              Apply Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
