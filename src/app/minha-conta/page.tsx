"use client";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { deleteUserAction } from "./delete-user-action";

function MinhaContaContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        async function fetchProfile() {
            if (!userId) return;
            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();
            if (!error && data) setProfile(data);
        }
        fetchProfile();
    }, [userId]);

    async function handleDeleteAccount() {
        if (!userId) {
            alert("Erro ao deletar conta");
            return;
        }
        try {
            await deleteUserAction(userId);
            window.location.href = "/cadastro";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert("Erro ao deletar conta: " + err.message);
        }
    }

    return (
        <main className="max-w-6xl mx-auto py-8 px-2 sm:px-4 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={profile?.avatar_url || "https://github.com/gabscy.png"} />
                    <AvatarFallback>
                        {profile?.name
                            ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
                            : "CN"}
                    </AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg text-muted-foreground text-center sm:text-left">
                    {profile?.name || "Nome do usuário"}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-sm font-medium leading-none">Email</h4>
                    <p className="text-sm text-muted-foreground break-all">
                        {profile?.email || "Email do usuário"}
                    </p>
                </div>
                <div>
                    <h4 className="text-sm font-medium leading-none">Gênero</h4>
                    <p className="text-sm text-muted-foreground">
                        {profile?.gender || "Gênero do usuário"}
                    </p>
                </div>
                <div>
                    <h4 className="text-sm font-medium leading-none">Idade</h4>
                    <p className="text-sm text-muted-foreground">
                        {profile?.age || "Idade do usuário"}
                    </p>
                </div>
            </div>

            <div>
                <Button variant="destructive" onClick={handleDeleteAccount} className="w-full sm:w-auto">
                    Deletar Conta
                </Button>
            </div>
        </main>
    );
}

export default function MinhaConta() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
                <MinhaContaContent />
            </Suspense>
        </>
    );
}