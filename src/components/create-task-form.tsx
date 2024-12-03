import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserSelect } from "./user-select"

type CreateTaskFormProps = {
  onAddTask: (description: string, assignedTo: string) => void
  users: { value: string; label: string }[]
}

export function CreateTaskForm({ onAddTask, users }: CreateTaskFormProps) {
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && assignedTo) {
      onAddTask(description, assignedTo)
      setDescription("")
      setAssignedTo("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Descripción de la tarea</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese la descripción de la tarea"
          required
        />
      </div>
      <div>
        <Label htmlFor="assignedTo">Asignar a</Label>
        <UserSelect onSelect={setAssignedTo} users={users} />
      </div>
      <Button type="submit">Crear Tarea</Button>
    </form>
  )
}

