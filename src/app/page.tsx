import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <Button>Click me</Button>
    </div>
  );
}
