
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
  const [tasks, setTasks] = useState<Task[]>([])

  // Agregar la lista de usuarios al componente
  const users1 = [
    { value: "alice", label: "Alice Johnson" },
    { value: "bob", label: "Bob Smith" },
    { value: "carol", label: "Carol Williams" },
    { value: "dave", label: "Dave Brown" },
  ]

  const [users, setusers] = useState(users1);

  // Modificar la función addTask para manejar el nuevo formato de assignedTo
  const addTask = (description: string, assignedTo: string) => {
    const assignedUser = users.find(user => user.value === assignedTo)
    if (assignedUser) {
      const newTask: Task = {
        id: tasks.length + 1,
        description,
        assignedTo: assignedUser,
        status: "pendiente",
      }
      setTasks([...tasks, newTask])
    }
  }

  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>
      <Tabs defaultValue="create">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Crear Tarea</TabsTrigger>
          <TabsTrigger value="manage">Gestionar Tareas</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateTaskForm />
        </TabsContent>
        <TabsContent value="manage">
          <TaskList  />
        </TabsContent>
      </Tabs>
    </div>
  )
}

