'use client'

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/Header"
import { createClient } from "@/utils/supabase/client"
import { useState, useRef } from "react"
import { toast } from "sonner"

const tipo = [
    { label: "Calça", value: "calca" },
    { label: "Camisa", value: "vamisa" },
    { label: "Vestido", value: "vestido" }
] as const

const cores = [
    { label: "Preto", value: "preto" },
    { label: "Azul", value: "azul" },
    { label: "Branco", value: "branco" }
] as const

const FormSchema = z.object({
    nome: z.string({
        required_error: "Digite um nome para a roupa."
    }),
    tipo: z.string({
        required_error: "Selecione um tipo de roupa.",
    }),
    cor: z.string({
        required_error: "Selecione uma cor.",
    }),
    descricao: z.string()
})

export default function Cadastro() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nome: "",
            tipo: "",
            cor: "",
            descricao: "",
        },
    })

    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            toast.error("Usuário não autenticado.");
            setLoading(false);
            return;
        }
        toast.success("Usuário autenticado!");

        // Get the file from the input
        const file = fileInputRef.current?.files?.[0];
        let image_url = null;

        if (file) {
            const fileExt = file.name.split('.').pop();
            const filePath = `roupas/${user.id}/${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                toast.error("Erro ao fazer upload da imagem: " + uploadError.message);
                setLoading(false);
                return;
            }
            image_url = filePath;
        }

        // Insert the clothing item with user_id
        const { data, error } = await supabase.from("roupas").insert([
            { ...values, user_id: user.id, image_url }
        ]).select('id').single();

        if (error) {
            toast.error("Erro ao cadastrar roupa: " + error.message);
            setLoading(false);
            return;
        }

        toast.success("Roupa cadastrada com sucesso!");

        setTimeout(() => {
            setLoading(false);
            if (data && data.id) {
                window.location.href = `/roupa?id=${data.id}`;
            }
        }, 1200);
    }

    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto py-8 px-2 sm:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome da roupa" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tipo de Roupa</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? tipo.find(
                                                                (language) => language.value === field.value
                                                            )?.label
                                                            : "Selecionar tipo"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Procurar tipo..." />
                                                    <CommandList>
                                                        <CommandEmpty>No language found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {tipo.map((language) => (
                                                                <CommandItem
                                                                    value={language.label}
                                                                    key={language.value}
                                                                    onSelect={() => {
                                                                        form.setValue("tipo", language.value)
                                                                    }}
                                                                >
                                                                    {language.label}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            language.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cor"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Cor da Roupa</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? cores.find(
                                                                (cor) => cor.value === field.value
                                                            )?.label
                                                            : "Selecionar cor"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Procurar cor..." />
                                                    <CommandList>
                                                        <CommandEmpty>No language found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {cores.map((cor) => (
                                                                <CommandItem
                                                                    value={cor.label}
                                                                    key={cor.value}
                                                                    onSelect={() => {
                                                                        form.setValue("cor", cor.value)
                                                                    }}
                                                                >
                                                                    {cor.label}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            cor.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Descrição da roupa"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Imagem da Roupa</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                    />
                                </FormControl>
                            </FormItem>
                            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
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
                                        Salvando...
                                    </span>
                                ) : (
                                    "Finalizar Cadastro"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </main>
        </>
    )
}
