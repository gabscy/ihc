import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShirtIcon, WashingMachine } from "lucide-react";

export default function Metricas() {
    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8">
                <Label>Métricas de uso</Label>

                <section className="grid grid-cols-5 mt-4 gap-4">
                    <Card>
                        <CardContent className="flex flex-col items-center">
                            <WashingMachine className="mb-2" />
                            <CardTitle>100</CardTitle>
                            <CardDescription>Roupas Usadas</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex flex-col items-center">
                            <ShirtIcon className="mb-2" />
                            <CardTitle>100</CardTitle>
                            <CardDescription>Roupas Cadastradas</CardDescription>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    )
}