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
import { EstadoMS } from "@/interfaces/tareasInterfaces"



type DatoSelectProps = {
  onSelect: (value: string) => void
  datos: EstadoMS[]
}

export function DatoSelect({ onSelect, datos }: DatoSelectProps) {

  console.log(datos)
  

  return (
    <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Seleccione..." />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Seleccione</SelectLabel>
        {datos.map((dato: EstadoMS) => (
           <SelectItem key={dato.id} value={dato.id.toString()}>
              {dato.estado}
            </SelectItem>
          ))  
        }
       
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