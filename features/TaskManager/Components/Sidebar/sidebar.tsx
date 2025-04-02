"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import menu from "@/app/utils/menu";
import { UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Botão para abrir a sidebar */}
      <SheetTrigger asChild>
        <Button className="text-black" variant="outline">
          ☰ Menu
        </Button>
      </SheetTrigger>

      {/* Conteúdo da sidebar */}
      <SheetContent side="left" className="w-64 p-4">
        {/* Adicionando o SheetTitle para acessibilidade */}
        <SheetTitle className="text-lg font-semibold">Navegação</SheetTitle>

        <ul className="mt-4">
          {menu.map((item) => (
            <li
              key={item.link}
              className={`py-2 ${
                pathname === item.link ? "text-blue-500" : ""
              }`}
            >
              <Link
                href={item.link}
                onClick={() => setOpen(false)}
                className="text-black flex items-center gap-2"
              >
                {item.icon} {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 mb-4 mt-auto">
          <UserButton showName />
        </div>
      </SheetContent>
    </Sheet>
  );
}
