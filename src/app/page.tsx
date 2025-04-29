import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react"
import Image from "next/image";

export default function Home() {
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
              placeholder="Search the docs..."
              className="pl-8"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </div>

          <Button
            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          >
            <Plus />
            <span>Cadastrar Roupa</span>
          </Button>
        </div>

        <section className="grid grid-cols-3 pt-4"> 
          <Card>
            <CardContent>
              <div className="relative w-full h-[240px] mb-4">
                <Image alt="imagem" src="/" fill className="bg-gray-200" />
              </div>
              <CardTitle>Nome da roupa</CardTitle>
              <CardDescription>Breve descrição</CardDescription>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
