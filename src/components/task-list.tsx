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
import { EstadoTareaMS, NombreEstado, NombreRol, TareaME, TareaMS, TareaResumenMS } from "@/interfaces/tareasInterfaces"
import { DialogoEditar } from "./editar"
import Layout from "./layout-sidebar"
import { DialogoAprobar } from "./aprobar"
import { useAuth } from "@/hooks/useAuth"
  


   
  export function TaskList() {
    const { user } = useAuth();
    const [Tareas, setTareas] = useState<TareaResumenMS[]>([]);

    useEffect(() => {
      loadEstado();
    }, [])

    const loadEstado = async () => {
      const estados = await apiDB.get<TareaResumenMS[]>("/Tarea")
      if(user?.miembrosDe.find(x => x == NombreRol.Administrador)){
        setTareas(estados.data)
      }else{
        setTareas(estados.data.filter(x => x.usuariosAsignados?.find(y => y.usuarioAD == user?.principal.samAccountName)))
      }

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

    const descargarArchivo = async (idTarea: number) => {
      try{
      const tarea = await apiDB.get(`/Tarea/archivo/${idTarea}`,{
        responseType: 'blob',
      })
      if (tarea) {
        
        const blob = new Blob([tarea.data], { type: tarea.data.type });

        // Crear una URL para el blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.download = "documento." + tarea.data.type.split("/")[1];
        document.body.appendChild(link);

        // Hacer clic en el enlace para iniciar la descarga
        link.click();

        // Limpiar el DOM
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
        console.error("Error al descargar el archivo:", error);
        alert("Hubo un problema al descargar el archivo.");
    }
      
    }
    
  
    return (
      <Layout>
      <div className="w-full container mx-auto p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >ID</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Archivo</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Fecha</TableHead>
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
              <TableCell className="text-blue-600"><a href="#" onClick={() => descargarArchivo(task.idTarea)} >{task.nombreArchivo

                }</a></TableCell>
                <TableCell>{
                  task.usuariosAsignados?.map((u) => u.usuarioAD).join(", ") || "N/A"                  
                  }</TableCell>
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
                  {
                    (task.nombreArchivo != null && !task.nombreArchivo.startsWith("signed_") && user?.miembrosDe.filter(x=> x == NombreRol.Administrador)[0]==NombreRol.Administrador) &&(
                      <DialogoAprobar color="bg-sky-700"
                      idTarea={task.idTarea} tipo={task.tipo} nombreArchivo={task.nombreArchivo}/>
                    )

                  }
                    
                  
                    
                  
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
  
  