"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TopBar from "@/components/topbar";
import FileView from "@/components/fileview";
import CardGrid, { DocumentData } from "@/components/cardgrid";
import AddDocumentDialog from "@/components/add-document-dialog";
import { useAtomValue } from "jotai";
import { authStore } from "@/store/auth";

import Login from "@/components/login";

const DashboardLayout = () => {
  const [selectedCard, setSelectedCard] = useState<DocumentData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoggedIn } = useAtomValue(authStore);
  const [cards, setCards] = useState<DocumentData[]>([
    {
      id: 1,
      title: "FV 12/2/2025",
      description: "Sprawności",
      value: 79.99,
      metadata: {
        Created: "2024-02-21",
        Status: "Active",
        Category: "Reports",
        Owner: "John Doe",
      },
      items: [
        {
          id: 1,
          name: "Monthly Report",
          status: "Complete",
          date: "2024-02-20",
        },
        { id: 2, name: "Weekly Stats", status: "Pending", date: "2024-02-21" },
        {
          id: 3,
          name: "Daily Metrics",
          status: "In Progress",
          date: "2024-02-21",
        },
      ],
    },
  ]);

  const handleCardSelect = (card: DocumentData) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  const handleFileSubmit = (file: File) => {
    const newCard: DocumentData = {
      id: cards.length + 1,
      title: file.name,
      description: `Uploaded on ${new Date().toLocaleDateString()}`,
      value: 0, // You might want to set this based on file processing
      metadata: {
        Created: new Date().toISOString().split("T")[0],
        Status: "Processing",
        Category: "Uncategorized",
        Owner: "Unassigned",
        Size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      },
      items: [],
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isLoggedIn ? (
        <>
          <TopBar />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Twoje faktury</h2>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Dodaj fakturę
              </Button>
            </div>

            <CardGrid
              cards={cards}
              selectedCard={selectedCard}
              onCardSelect={handleCardSelect}
            />

            <FileView
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              title={selectedCard?.title}
              metadata={selectedCard?.metadata || {}}
              items={selectedCard?.items || []}
            />
            <AddDocumentDialog
              isOpen={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              onSubmit={handleFileSubmit}
            />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
