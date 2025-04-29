import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MinhaConta() {
    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8 space-y-4">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/gabscy.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <p className="font-bold text-sm text-muted-foreground">
                        Nome do usuário
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-medium leading-none">Email</h4>
                    <p className="text-sm text-muted-foreground">
                        Email do usuário
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-medium leading-none">Gênero</h4>
                    <p className="text-sm text-muted-foreground">
                        Gênero do usuário
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-medium leading-none">Idade</h4>
                    <p className="text-sm text-muted-foreground">
                        Idade do usuário
                    </p>
                </div>
            </main>
        </>
    )
}