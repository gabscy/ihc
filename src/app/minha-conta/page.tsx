"use client";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { deleteUserAction } from "./delete-user-action";

export default function MinhaConta() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id"); // expects /minha-conta?id=xxxx

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
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8 space-y-4">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={profile?.avatar_url || "https://github.com/gabscy.png"} />
                        <AvatarFallback>
                            {profile?.name
                                ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
                                : "CN"}
                        </AvatarFallback>
                    </Avatar>

                    <p className="font-bold text-sm text-muted-foreground">
                        {profile?.name || "Nome do usuário"}
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-medium leading-none">Email</h4>
                    <p className="text-sm text-muted-foreground">
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

                <div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                        Deletar Conta
                    </Button>
                </div>
            </main>
        </>
    );
}