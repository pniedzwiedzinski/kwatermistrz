"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useSetAtom } from "jotai";
import { authStore } from "@/store/auth";

import { ModeToggle } from "@/components/theme-switcher";

export default function TopBar() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const setIsLoggedIn = useSetAtom(authStore);
  const logout = () => {
    setIsLoggedIn({ isLoggedIn: false, access_token: "" });
  };
  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Kwatermistrz</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Wyloguj
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
