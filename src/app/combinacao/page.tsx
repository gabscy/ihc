import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Combincacao() {
    return (
        <>
            <Header /> 

            <main className="max-w-6xl mx-auto py-8">
                <div className="flex justify-between">   
                    <Label>Combincação</Label>

                    <Button>Usar Roupa</Button>
                </div>

                <section className="grid grid-cols-3 gap-4 mt-4">
                    <Card>
                        <CardContent>
                            <div className="relative w-full h-[240px] mb-4">
                            <Image alt="imagem" src="http://github.com/gabscy.png" fill className="bg-gray-200" />
                            </div>
                            <CardTitle>Nome da roupa</CardTitle>
                            <CardDescription>Breve descrição</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="relative w-full h-[240px] mb-4">
                            <Image alt="imagem" src="http://github.com/gabscy.png" fill className="bg-gray-200" />
                            </div>
                            <CardTitle>Nome da roupa</CardTitle>
                            <CardDescription>Breve descrição</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="relative w-full h-[240px] mb-4">
                            <Image alt="imagem" src="http://github.com/gabscy.png" fill className="bg-gray-200" />
                            </div>
                            <CardTitle>Nome da roupa</CardTitle>
                            <CardDescription>Breve descrição</CardDescription>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    )
}