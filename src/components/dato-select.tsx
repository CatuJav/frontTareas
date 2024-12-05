import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Dato = {
  value: string
  label: string
}

type DatoSelectProps = {
  onSelect: (value: string) => void
  datos: Dato[]
}

export function DatoSelect({ onSelect, datos }: DatoSelectProps) {


  return (
    <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}


/*<Command>
<CommandInput placeholder="Type a command or search..." />
<CommandList>
  <CommandEmpty>No results found.</CommandEmpty>
  <CommandGroup heading="Suggestions">
    <CommandItem>Calendar</CommandItem>
    <CommandItem>Search Emoji</CommandItem>
    <CommandItem>Calculator</CommandItem>
  </CommandGroup>
  <CommandSeparator />
  <CommandGroup heading="Settings">
    <CommandItem>Profile</CommandItem>
    <CommandItem>Billing</CommandItem>
    <CommandItem>Settings</CommandItem>
  </CommandGroup>
</CommandList>
</Command>*/