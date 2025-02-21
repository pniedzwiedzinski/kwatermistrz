"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";

import { ModeToggle } from "@/components/theme-switcher";

export default function TopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Kwatermistrz</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleAuth}
            className="flex items-center gap-2"
          >
            {isLoggedIn ? (
              <>
                <LogOut className="h-4 w-4" /> Logout
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Login
              </>
            )}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
