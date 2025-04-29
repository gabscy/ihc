import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, Edit, Heart } from "lucide-react";
import Image from "next/image";

export default function Roupa() {
    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8">
                <div className="flex justify-between">
                    <Button variant={"ghost"}>
                        <ChevronLeft />
                        Voltar
                    </Button>

                    <div className="flex gap-4">
                        <Button variant={'secondary'}>
                            <Edit />
                            Editar Roupa
                        </Button>
                        <Toggle variant={'outline'} aria-label="Toggle bold" className="rounded-full">
                            <Heart className="h-4 w-4" />
                        </Toggle>
                    </div>
                </div>

                <Card className="grid grid-cols-2 gap-4 mt-4 border-none shadow-none">
                    <div className="relative h-[300px] bg-muted">
                        <Image alt="Imagem da roupa" src="http://github.com/gabscy.png" fill objectFit="contain" />
                    </div>

                    <CardContent className="flex flex-col justify-between">
                        <div>
                            <CardTitle className="text-lg">Nome da roupa</CardTitle>
                            <CardDescription className="text-md mb-2">Tipo de Roupa</CardDescription>
                            <CardDescription>Descrição da roupa</CardDescription>
                        </div>
                        <Button className="w-auto self-start">Adicionar Roupa</Button>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}