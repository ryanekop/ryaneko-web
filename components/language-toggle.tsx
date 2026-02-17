"use client"

import * as React from "react"
import { Globe, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
    // Simple state since full i18n isn't set up yet, but UI is requested
    const [lang, setLang] = React.useState("id")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Choose language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang("id")} className="cursor-pointer justify-between">
                    Indonesia
                    {lang === "id" && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("en")} className="cursor-pointer justify-between">
                    English
                    {lang === "en" && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
