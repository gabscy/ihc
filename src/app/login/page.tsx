import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <header>
        <div className="flex justify-between items-center py-2 px-8 border-b">
          <Label className="text-2xl">Guarda Roupa Virtual</Label>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={'/login'}>
                  <Button variant={"secondary"}>
                    Login
                  </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={'/cadastro'}>
                  <Button>
                    Cadastrar
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>
                Fazer login
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Link href={"/"}>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </Link>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href={"/cadastro"} className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </main>
    </>
  );
}
