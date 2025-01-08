import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { CreateTaskForm } from './components/create-task-form.tsx';
import { TaskList } from './components/task-list.tsx';
import { LoginPage } from './pages/login.tsx';

createRoot(document.getElementById('root')!).render(

      <BrowserRouter>
     <Routes>
     <Route path='/' element={<LoginPage />} />
      <Route path='/crear' element={<CreateTaskForm />} />
      <Route path='/listar' element={<TaskList  />} />
    </Routes>
  </BrowserRouter>
    
  
)
