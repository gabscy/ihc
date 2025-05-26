"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

function RoupaContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [roupa, setRoupa] = useState<any>(null);
    const [liked, setLiked] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    async function handleDelete() {
        if (!window.confirm("Tem certeza que deseja deletar esta peça?")) return;
        setDeleting(true);
        const supabase = createClient();
        const { error } = await supabase.from("roupas").delete().eq("id", roupa.id);
        if (error) {
            toast.error("Erro ao deletar peça: " + error.message);
            setDeleting(false);
            return;
        }
        toast.success("Peça deletada com sucesso!");
        router.push("/");
    }

    if (!roupa) {
        return (
            <main className="max-w-6xl mx-auto py-8">
                <p>Carregando...</p>
            </main>
        );
    }

    return (
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
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleDelete}
                        disabled={deleting}
                        title="Deletar peça"
                    >
                        {deleting ? (
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
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                            </svg>
                        )}
                    </Button>
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
    );
}

export default function Roupa() {
    return (
        <>
            <Header />
            <Suspense fallback={<p>Carregando...</p>}>
                <RoupaContent />
            </Suspense>
        </>
    );
}