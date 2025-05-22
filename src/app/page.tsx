'use client'

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [roupas, setRoupas] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRoupas() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("roupas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setRoupas(data);
    }
    fetchRoupas();
  }, []);

  const filteredRoupas = roupas.filter((roupa) =>
    roupa.nome.toLowerCase().includes(search.toLowerCase()) ||
    (roupa.descricao && roupa.descricao.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto py-8">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              placeholder="Buscar roupas..."
              className="pl-8"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </div>

          <Link href={"/cadastrar-roupa"}>
            <Button
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <Plus />
              <span>Cadastrar Roupa</span>
            </Button>
          </Link>
        </div>

        <section className="grid grid-cols-3 pt-4 gap-4">
          {filteredRoupas.length === 0 ? (
            <p className="col-span-3 text-center text-muted-foreground pt-8">Nenhuma roupa encontrada.</p>
          ) : (
            filteredRoupas.map((roupa) => (
              <Card key={roupa.id}>
                <CardContent>
                  <Link href={`/roupa?id=${roupa.id}`}>
                    <div className="relative w-full h-[240px] mb-4">
                      {roupa.image_url ? (
                        <Image
                          alt={roupa.nome}
                          src={`https://fimyopkehttxuhdgslmm.supabase.co/storage/v1/object/public/images/${roupa.image_url}`}
                          fill
                          className="bg-gray-200 object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-muted-foreground">
                          Sem imagem
                        </div>
                      )}
                    </div>
                    <CardTitle>{roupa.nome}</CardTitle>
                    <CardDescription>{roupa.descricao}</CardDescription>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      </main>
    </>
  );
}
