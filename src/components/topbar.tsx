"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, LogIn, BookPlus } from "lucide-react";
import { useSetAtom, useAtomValue } from "jotai";
import { authStore } from "@/store/auth";

import { ModeToggle } from "@/components/theme-switcher";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useAtomValue(authStore);
  const setIsLoggedIn = useSetAtom(authStore);
  const logout = () => {
    setIsLoggedIn({ isLoggedIn: false, access_token: "" });
  };
  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <BookPlus />
          <h1 className="text-xl font-bold">Kwatermistrz</h1>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button
              variant="outline"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Wyloguj
            </Button>
          ) : (
            <>
              <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Zaloguj się
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>To jeszcze nie działa</DialogTitle>
                  <p>Logowanie nie jest jeszcze dostępne</p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowModal(false)}
                    >
                      Zamknij
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
