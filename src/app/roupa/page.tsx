"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Roupa() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // expects /roupa?id=xxxx
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [roupa, setRoupa] = useState<any>(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        async function fetchRoupa() {
            if (!id) return;
            const supabase = createClient();
            const { data, error } = await supabase
                .from("roupas")
                .select("*")
                .eq("id", id)
                .single();
            if (!error) setRoupa(data);
        }
        fetchRoupa();
    }, [id]);

    useEffect(() => {
        if (roupa && typeof roupa.liked === "boolean") {
            setLiked(roupa.liked);
        }
    }, [roupa]);

    async function handleToggleLike() {
        const supabase = createClient();
        const newLiked = !liked;
        setLiked(newLiked);
        await supabase
            .from("roupas")
            .update({ liked: newLiked })
            .eq("id", roupa.id);
    }

    if (!roupa) {
        return (
            <>
                <Header />
                <main className="max-w-6xl mx-auto py-8">
                    <p>Carregando...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="max-w-6xl mx-auto py-8 px-2 sm:px-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <Button variant={"ghost"} onClick={() => router.back()} className="w-fit">
                        <ChevronLeft />
                        Voltar
                    </Button>
                    <div className="flex gap-4 justify-end">
                        <Toggle
                            variant={'outline'}
                            aria-label="Toggle like"
                            className="rounded-full"
                            pressed={liked}
                            onPressedChange={handleToggleLike}
                        >
                            <Heart className="h-4 w-4" fill={liked ? "red" : "none"} />
                        </Toggle>
                    </div>
                </div>
                <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-none shadow-none">
                    <div className="relative h-60 sm:h-72 md:h-[300px] bg-muted">
                        {roupa.image_url ? (
                            <Image
                                alt="Imagem da roupa"
                                src={`https://fimyopkehttxuhdgslmm.supabase.co/storage/v1/object/public/images/${roupa.image_url}`}
                                fill
                                style={{ objectFit: "contain" }}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Sem imagem
                            </div>
                        )}
                    </div>
                    <CardContent className="flex flex-col justify-between">
                        <div>
                            <CardTitle className="text-lg">{roupa.nome}</CardTitle>
                            <CardDescription className="text-md mb-2">{roupa.tipo}</CardDescription>
                            <CardDescription>{roupa.descricao}</CardDescription>
                        </div>
                        <Button
                            className="w-full sm:w-auto self-start mt-4"
                            onClick={() => {
                                const current = JSON.parse(localStorage.getItem("combination") || "[]");
                                if (!current.includes(roupa.id)) {
                                    current.push(roupa.id);
                                    localStorage.setItem("combination", JSON.stringify(current));
                                }
                                alert("Roupa adicionada à combinação!");
                            }}
                        >
                            Adicionar Roupa
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}