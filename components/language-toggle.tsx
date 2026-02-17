"use client"

import { Globe, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/lib/i18n"

export function LanguageToggle() {
    const { locale, setLocale } = useI18n()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Choose language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocale("id")} className="cursor-pointer justify-between">
                    Indonesia
                    {locale === "id" && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("en")} className="cursor-pointer justify-between">
                    English
                    {locale === "en" && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
