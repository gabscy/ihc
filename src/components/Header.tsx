'use client'

import { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <header>
      <div className="flex justify-between items-center py-2 px-8 border-b">
        <Label className="text-2xl">Guarda Roupa Virtual</Label>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/metricas">
                Métricas
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href={userId ? `/minha-conta?id=${userId}` : "/minha-conta"}
              >
                Minha Conta
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/combinacao">
                Combinação
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}