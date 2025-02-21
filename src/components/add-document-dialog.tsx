import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface AddDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File) => void;
}

export default function AddDocumentDialog({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddDocumentDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Dodaj nową fakturę</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-500">
                  {selectedFile ? selectedFile.name : "Wybierz plik"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedFile
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : "PDF, JPG, PNG (max. 10MB)"}
                </p>
              </div>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Anuluj
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="ml-2"
          >
            {selectedFile ? "Wyślij" : "Wybierz plik"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
