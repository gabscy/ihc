'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log("User logged in:", data);
      router.push("/"); // Redirect after login
    }
  };


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
              <CardDescription>Entre na sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                  <Button type="submit" className="w-full">Login</Button>
                </div>
              </form>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="underline underline-offset-4">
                  Cadastre-se
                </Link>
              </div>
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
