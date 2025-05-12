import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/minha-conta">
                  Minha Conta
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/combinacao">
                  Combinação
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={"/login"}>
                  <Button variant={"secondary"}>
                    Login
                  </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={"/cadastro"}>
                  <Button>
                    Cadastrar
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    )
}