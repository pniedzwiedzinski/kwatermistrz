import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export interface DocumentItem {
  name: string;
  price: number;
  category: string;
}

export interface Metadata {
  formOfPayment: string;
  documentNumber: string;
  cutomerNIP: string;
  date: string;
  total: number;
}

export interface DocumentData {
  id: number;
  title: string;
  description: string;
  value: number;
  metadata: Metadata | unknown;
  items: DocumentItem[];
}

interface CardGridProps {
  cards: DocumentData[];
  selectedCard: DocumentData | null;
  onCardSelect: (card: DocumentData) => void;
}

export default function CardGrid({
  cards,
  selectedCard,
  onCardSelect,
}: CardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`hover:shadow-lg transition-shadow cursor-pointer ${
            selectedCard?.id === card.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onCardSelect(card)}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center gap-4">
              <span>{card.title}</span>
              <span>{card.value}zł</span>
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Kliknij aby zobaczyć więcej...
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
