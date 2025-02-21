import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentItem } from "./cardgrid";
import Image from "next/image";

interface Metadata {
  [key: string]: string;
}

interface FileViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  metadata: Metadata | unknown;
  items: DocumentItem[];
  imageUrl?: string;
}

export default function FileView({
  isOpen,
  onOpenChange,
  title,
  metadata,
  items,
  imageUrl = "/api/placeholder/400/320",
}: FileViewProps) {
  const FileContent = () => (
    <div className="space-y-6">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="Card preview"
          className="rounded-lg object-cover"
        />
      </div>

      {!!metadata && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(metadata).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-500">{key}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.itemTotalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <FileContent />
      </DialogContent>
    </Dialog>
  );
}
