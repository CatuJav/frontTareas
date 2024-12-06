import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
import { useState } from "react"
  
  type Task = {
    id: number
    description: string
    assignedTo: {
      value: string
      label: string
    }
    status: "pendiente" | "en progreso" | "completada"
  }
  
  type TaskListProps = {
    tasks: Task[]
    onUpdateStatus: (taskId: number, newStatus: Task["status"]) => void
  }
  
  export function TaskList({ tasks, onUpdateStatus }: TaskListProps) {

    const [Tareas, setTareas] = useState<Task[]>([
      {
        id: 1,
        description: "Tarea 1",
        assignedTo: {
          value: "alice",
          label: "Alice Johnson",
        },
        status: "pendiente",
      },
      {
        id: 2,
        description: "Tarea 2",
        assignedTo: {
          value: "bob",
          label: "Bob Smith",
        },
        status: "pendiente",
      },
      {
        id: 3,
        description: "Tarea 3",
        assignedTo: {
          value: "carol",
          label: "Carol Williams",
        },
        status: "pendiente",
      },
      {
        id: 4,
        description: "Tarea 4",
        assignedTo: {
          value: "dave",
          label: "Dave Brown",
        },
        status: "pendiente",
      },
    ]);
    

    const getStatusColor = (status: Task["status"]) => {
      switch (status) {
        case "pendiente":
          return "bg-yellow-500"
        case "en progreso":
          return "bg-blue-500"
        case "completada":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.assignedTo.label}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </TableCell>
              <TableCell>
                {task.status !== "completada" && (
                  <Button
                    onClick={() =>
                      onUpdateStatus(
                        task.id,
                        task.status === "pendiente" ? "en progreso" : "completada"
                      )
                    }
                  >
                    {task.status === "pendiente" ? "Iniciar" : "Completar"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  