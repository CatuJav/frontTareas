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


interface DatoSelectProps {
  value: string;
  onChange: (value: string) => void;
  datos: EstadoMS[];
  onSelect?: (value: string) => void;
}

export function DatoSelect({ value, onChange, datos }: DatoSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
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
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}