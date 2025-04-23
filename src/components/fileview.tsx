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
// import Image from "next/image";

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
}: // imageUrl = "/api/placeholder/400/320",
FileViewProps) {
  const FileContent = () => (
    <div className="space-y-6">
      {/* <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="Card preview"
          className="rounded-lg object-cover"
        />
      </div> */}

      {!!metadata && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(metadata).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-500">{key}</span>
              <p>{key == "total" ? `${value.toFixed(2)} zł` : value}</p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-lg font-medium mb-4">Podsumowanie</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(
          items.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.price;
            return acc;
          }, {} as Record<string, number>)
        ).map(([category, total]) => (
          <div
            key={category}
            className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-500">
              {category}
            </span>
            <p>{total.toFixed(2)} zł</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-medium mb-4">Lista produktów</h3>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa produktu</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Cena</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
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
