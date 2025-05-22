'use client'

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Combinacao() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [roupas, setRoupas] = useState<any[]>([]);

    function clearCombination() {
        localStorage.removeItem("combination");
        setRoupas([]);
    }

    useEffect(() => {
        async function fetchRoupas() {
            // Get selected roupa IDs from localStorage
            const ids = JSON.parse(localStorage.getItem("combination") || "[]");
            if (!ids.length) {
                setRoupas([]);
                return;
            }
            const supabase = createClient();
            const { data, error } = await supabase
                .from("roupas")
                .select("*")
                .in("id", ids);
            if (!error && data) setRoupas(data);
        }
        fetchRoupas();
    }, []);

    async function handleUsarRoupa() {
        const supabase = createClient();
        // Get selected roupa IDs from localStorage
        const roupaIds = JSON.parse(localStorage.getItem("combination") || "[]");
        if (!roupaIds.length) {
            alert("Nenhuma roupa selecionada.");
            return;
        }

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            alert("Usuário não autenticado.");
            return;
        }

        // Insert combination into the database
        const { error } = await supabase.from("combinacoes").insert([
            {
                user_id: user.id,
                roupa_ids: roupaIds,
            }
        ]);

        if (error) {
            alert("Erro ao salvar combinação: " + error.message);
            return;
        }

        // Clear localStorage and give feedback
        localStorage.removeItem("combination");
        alert("Combinação registrada com sucesso!");
        // Optionally, redirect or update UI here
    }

    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8">
                <div className="flex justify-between">
                    <Label>Combinação</Label>
                    <div className="flex gap-2">
                        <Button onClick={clearCombination} variant="outline">
                            Limpar Combinação
                        </Button>
                        <Button
                            onClick={handleUsarRoupa}
                        >
                            Usar Roupa
                        </Button>
                    </div>
                </div>

                <section className="grid grid-cols-3 gap-4 mt-4">
                    {roupas.length === 0 ? (
                        <p className="col-span-3 text-center text-muted-foreground pt-8">
                            Nenhuma roupa selecionada.
                        </p>
                    ) : (
                        roupas.map((roupa) => (
                            <Card key={roupa.id}>
                                <CardContent>
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
                                </CardContent>
                            </Card>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}