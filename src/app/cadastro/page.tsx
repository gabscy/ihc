'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
      toast.error("Erro ao cadastrar: " + error.message);
      setLoading(false);
    } else {
      toast.success("Cadastro realizado com sucesso!");
      // Insert into profiles table
      const user = data.user;
      if (user) {
        await supabase.from("profiles").insert([
          {
            id: user.id,
            email,
            name,
            age: age ? parseInt(age) : null,
            gender,
          },
        ]);
      }
      setTimeout(() => {
        setLoading(false);
        router.push("/");
      }, 1200);
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

      <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-2 sm:p-6 md:p-10">
        <div className={cn("flex flex-col gap-6 w-full max-w-md")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Cadastro</CardTitle>
              <CardDescription>Crie sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
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
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      min="0"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gênero</Label>
                    <Select value={gender} onValueChange={setGender} required>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Feminino</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errorMsg && <p className="text-red-500">Não foi possível realizar cadastro</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Cadastrando...
                      </span>
                    ) : (
                      "Cadastrar"
                    )}
                  </Button>
                </div>
              </form>
              <div className="text-center text-sm mt-4">
                Já tem uma conta?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Faça login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}