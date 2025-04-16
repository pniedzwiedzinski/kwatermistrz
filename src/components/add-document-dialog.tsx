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
import { DocumentItem } from "./cardgrid";

export interface ResponseData {
  formOfPayment: string;
  documentNumber: string;
  date: string;
  total: number;
  items: DocumentItem[];
}

interface AddDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ResponseData) => void;
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result?.toString() || "";
      const base64String = result.replace("data:", "").replace(/^.+,/, "");
      resolve(base64String);
    };
    // reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function AddDocumentDialog({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddDocumentDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      setIsLoading(true);
      try {
        const response = await fetch("/api", {
          method: "POST",
          body: JSON.stringify({
            mime_type: selectedFile.type,
            data: await toBase64(selectedFile),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to upload the document. Please try again.");
        }

        const responseData = await response.json();
        const documentData: ResponseData = {
          formOfPayment: responseData.pay_by_cash ? "cash" : "bank",
          documentNumber: responseData.document_number,
          date: responseData.date,
          total: responseData.total_cost,
          items: responseData.document_items,
        };
        onSubmit(documentData);
        setSelectedFile(null);
        onOpenChange(false);
      } catch (error) {
        alert("Coś poszło nie tak, odśwież stronę i spróbuj ponownie");
        console.error("Error uploading document:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {isLoading ? (
          <>
            <p>Poczekaj chwilę, to może zająć ok. minuty</p>
            <div className="flex justify-center items-center">
              <img
                src="https://c.tenor.com/YbS6ZRURai8AAAAd/tenor.gif"
                alt="Loading..."
              />
            </div>
          </>
        ) : (
          <>
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
                        : "JPG (max. 5MB)"}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
