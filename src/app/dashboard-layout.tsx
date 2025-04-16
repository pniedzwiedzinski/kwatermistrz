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
import { ResponseData } from "@/components/add-document-dialog";
import { useLocalStorage } from "@/lib/utils";

import Login from "@/components/login";

const DashboardLayout = () => {
  const [selectedCard, setSelectedCard] = useState<DocumentData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoggedIn } = useAtomValue(authStore);
  const [cards, setCards] = useLocalStorage<DocumentData[]>("cards", []);

  const handleCardSelect = (card: DocumentData) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  const handleFileSubmit = (response: ResponseData) => {
    const { formOfPayment, documentNumber, date, total, items } = response;
    const newCard: DocumentData = {
      id: cards.length + 1,
      title: response.documentNumber,
      description: `Uploaded on ${new Date().toLocaleDateString()}`,
      value: total, // You might want to set this based on file processing
      metadata: {
        formOfPayment,
        documentNumber,
        date,
        total,
      },
      items,
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

            {cards.length > 0 ? (
              <CardGrid
                cards={cards}
                selectedCard={selectedCard}
                onCardSelect={handleCardSelect}
              />
            ) : (
              <div className="text-center">
                <p className="text-lg text-gray-500">
                  Nie masz jeszcze żadnych faktur.
                </p>
              </div>
            )}

            <FileView
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              title={selectedCard?.title}
              metadata={selectedCard?.metadata}
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
