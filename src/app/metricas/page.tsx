'use client';

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShirtIcon, WashingMachine } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Metricas() {
    const [totalRoupas, setTotalRoupas] = useState(0);
    const [roupasUsadas, setRoupasUsadas] = useState(0);

    useEffect(() => {
        async function fetchMetrics() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Count total registered clothes
            const { count: roupasCount } = await supabase
                .from("roupas")
                .select("*", { count: "exact", head: true })
                .eq("user_id", user.id);

            setTotalRoupas(roupasCount || 0);

            // Get all combinations for the user
            const { data: combinacoes } = await supabase
                .from("combinacoes")
                .select("roupa_ids")
                .eq("user_id", user.id);

            // Count total times clothes were used in combinations
            let totalUsos = 0;
            if (combinacoes) {
                combinacoes.forEach((comb) => {
                    if (Array.isArray(comb.roupa_ids)) {
                        totalUsos += comb.roupa_ids.length;
                    }
                });
            }
            setRoupasUsadas(totalUsos);
        }
        fetchMetrics();
    }, []);

    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8">
                <Label>Métricas de uso</Label>

                <section className="grid grid-cols-5 mt-4 gap-4">
                    <Card>
                        <CardContent className="flex flex-col items-center">
                            <WashingMachine className="mb-2" />
                            <CardTitle>{roupasUsadas}</CardTitle>
                            <CardDescription>Roupas Usadas</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex flex-col items-center">
                            <ShirtIcon className="mb-2" />
                            <CardTitle>{totalRoupas}</CardTitle>
                            <CardDescription>Roupas Cadastradas</CardDescription>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    );
}