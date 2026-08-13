"use client"

import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/lib/i18n"

export function LanguageToggle({ showLabel = false }: { showLabel?: boolean }) {
    const { locale, setLocale } = useI18n()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={showLabel ? "sm" : "icon"} className="cursor-pointer">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    {showLabel ? <span className="ml-1 text-xs font-bold uppercase">{locale}</span> : null}
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setLocale("id")}
                    className={`cursor-pointer ${locale === "id" ? "bg-accent" : ""}`}
                >
                    Bahasa Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLocale("en")}
                    className={`cursor-pointer ${locale === "en" ? "bg-accent" : ""}`}
                >
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
