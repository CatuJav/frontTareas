
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateTaskForm } from "../components/create-task-form"
import { TaskList } from "../components/task-list"

// Actualizar la definición del tipo Task
type Task = {
  id: number
  description: string
  assignedTo: {
    value: string
    label: string
  }
  status: "pendiente" | "en progreso" | "completada"
}

export default function TaskManagement() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>
      <Tabs defaultValue="create">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Crear Tarea</TabsTrigger>
          <TabsTrigger value="manage">Gestionar Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          
        </TabsContent>
        <TabsContent value="manage">
          <TaskList  />
        </TabsContent>
      </Tabs>
    </div>
  )
}

