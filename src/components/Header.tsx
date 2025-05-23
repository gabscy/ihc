'use client'

import { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [openLogout, setOpenLogout] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      if (user) {
        const [{ count: roupasCount }, { data: combinacoes }] = await Promise.all([
          supabase
            .from("roupas")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id),
          supabase
            .from("combinacoes")
            .select("roupa_ids")
            .eq("user_id", user.id),
        ]);

        let totalUsos = 0;
        if (combinacoes) {
          combinacoes.forEach((comb) => {
            if (Array.isArray(comb.roupa_ids)) {
              totalUsos += comb.roupa_ids.length;
            }
          });
        }

        const randomDelay = Math.floor(Math.random() * 25000) + 5000;
        setTimeout(() => {
          toast.info(
            `Você tem ${roupasCount || 0} roupas cadastradas e ${totalUsos} usos registrados!`
          );
        }, randomDelay);
      }
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  // Navigation links for desktop (NavigationMenu)
  const navLinks = (
    <>
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
        <Button variant="destructive" onClick={() => setOpenLogout(true)} className="w-full">
          Logout
        </Button>
      </NavigationMenuItem>
    </>
  );

  // Navigation links for mobile (plain links/buttons) using Next.js <Link>
  const mobileLinks = (
    <>
      <Link href="/" className="py-2" onClick={() => setOpenMobileMenu(false)}>
        Home
      </Link>
      <Link href="/metricas" className="py-2" onClick={() => setOpenMobileMenu(false)}>
        Métricas
      </Link>
      <Link
        href={userId ? `/minha-conta?id=${userId}` : "/minha-conta"}
        className="py-2"
        onClick={() => setOpenMobileMenu(false)}
      >
        Minha Conta
      </Link>
      <Link href="/combinacao" className="py-2" onClick={() => setOpenMobileMenu(false)}>
        Combinação
      </Link>
      <Button
        variant="destructive"
        onClick={() => {
          setOpenLogout(true);
          setOpenMobileMenu(false);
        }}
        className="w-full mt-2"
      >
        Logout
      </Button>
    </>
  );

  return (
    <header>
      <div className="flex justify-between items-center py-2 px-4 md:px-8 border-b">
        <Label className="text-2xl">Guarda Roupa Virtual</Label>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {navLinks}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpenMobileMenu(true)}
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile Navigation Dialog */}
      <Dialog open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
        <DialogContent className="p-0">
          <DialogHeader>
            <DialogTitle className="px-6 pt-6">Menu</DialogTitle>
          </DialogHeader>
          <nav className="flex flex-col gap-2 px-6 pb-6">
            {mobileLinks}
            <Button variant="outline" onClick={() => setOpenMobileMenu(false)}>
              Fechar
            </Button>
          </nav>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente sair?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenLogout(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}