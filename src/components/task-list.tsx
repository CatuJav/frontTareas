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
import { useEffect, useState } from "react"
import apiDB from "@/api/apiDB"
import { EstadoTareaMS, NombreEstado, TareaME, TareaMS, TareaResumenMS } from "@/interfaces/tareasInterfaces"
import { DialogoEditar } from "./editar"
import Layout from "./layout-sidebar"
  

  type Task = {
    id: number
    description: string
    assignedTo: {
      value: string
      label: string
    }
    status: "pendiente" | "en progreso" | "completada"
  }
   
  export function TaskList() {

    const [Tareas, setTareas] = useState<TareaResumenMS[]>([]);

    useEffect(() => {
      loadEstado();
    }, [])

    const loadEstado = async () => {
      const estados = await apiDB.get<TareaResumenMS[]>("/Tarea")
      setTareas(estados.data)
      console.log(estados.data);
      }
    
    
      const iniciarTarea = async (idTarea: number) => {
        const tarea = await apiDB.get<TareaMS>(`/Tarea/${idTarea}`)
        const estado = await apiDB.get<EstadoTareaMS[]>(`/EstadoTarea`)
        if (tarea) {
          const nuevaTarea:TareaME = { ...tarea.data, idEstado: estado.data.find((e) => e.estado === NombreEstado.Progreso)!.id, idUsuarios: [], propgreso: 0 }
          const response = await apiDB.put(`/Tarea`, nuevaTarea)
          if (response.status === 200) {
            loadEstado()
        }
      }}

    

    const getStatusColor = (status: TareaResumenMS["nombreEstado"]) => {
      switch (status) {
        case NombreEstado.Nuevo:
          return "bg-green-500"
        case NombreEstado.Progreso:
          return "bg-blue-500"
        case NombreEstado.Fin:
          return "bg-gray-500"
        default:
          return "bg-gray-500"
      }
    }

    const getBotonColor = (status: TareaResumenMS["nombreEstado"]) => {
      switch (status) {
        case NombreEstado.Nuevo:
          return "bg-green-900"
        case NombreEstado.Progreso:
          return "bg-indigo-700"
        case NombreEstado.Fin:
          return "bg-purple-600"
        default:
          return "bg-gray-500"
      }
    }

    const guardarAvance = async (idTarea: number, avance: number) => {
      const tarea = await apiDB.get<TareaMS>(`/Tarea/${idTarea}`)
      if (tarea) {
        const nuevaTarea = { ...tarea.data, progreso: avance }
        const response = await apiDB.put(`/Tarea`, nuevaTarea)
        if (response.status === 200) {
          loadEstado()
        }
      }
    }
  
    return (
      <Layout>
      <div className="w-full container mx-auto p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">ID</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Archivo</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Tareas.map((task) => (
            <TableRow key={task.idTarea}>
              <TableCell>{task.idTarea}</TableCell>
              <TableCell>{task.titulo}</TableCell>
              <TableCell>{task.descripcion}</TableCell>
              <TableCell className="text-blue-600"><a href="#" >{"archivo" + Math.floor(Math.random() * 100) + ".pdf"

                }</a></TableCell>
              <TableCell> {task.fecha ? new Date(task.fecha).toDateString() : "N/A"}</TableCell>
              <TableCell>
                <Badge  className={getStatusColor(task.nombreEstado)}>{task.nombreEstado}</Badge>
              </TableCell>
              <TableCell>{task.progreso}%</TableCell>
              <TableCell>
                {task.nombreEstado != NombreEstado.Fin && (
                  <div>
                     {task.nombreEstado === NombreEstado.Nuevo ?(
                      <div className="flex gap-2">
                  <Button className={getBotonColor(task.nombreEstado)}
                    onClick={() =>{
                     if(task.nombreEstado === NombreEstado.Nuevo){
                        iniciarTarea(task.idTarea)
                      }
                    }
                    }
                  >
                    Iniciar
                  </Button>
                 
                  </div>
                  ):
                  <div className="flex gap-2">
                  <DialogoEditar color={getBotonColor(task.nombreEstado)}
                    tarea={task}
                   
                    
                  />
                     <Button className="bg-sky-700"
                    onClick={() =>{
                     if(task.nombreEstado === NombreEstado.Nuevo){
                        iniciarTarea(task.idTarea)
                      }
                    }
                    }
                  >
                    Aprobar
                  </Button>
                  </div>
                  
                  }
                  </div>
                  
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      </Layout>
    )
  }
  
  