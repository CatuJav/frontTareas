import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.tsx'
import { CreateTaskForm } from './components/create-task-form.tsx';
import { TaskList } from './components/task-list.tsx';
import Layout from './components/layout-sidebar.tsx';

createRoot(document.getElementById('root')!).render(
   <Layout>
      <BrowserRouter>
     <Routes>
     <Route path='/' element={<CreateTaskForm />} />
      <Route path='/crear' element={<CreateTaskForm />} />
      <Route path='/listar' element={<TaskList  />} />
    </Routes>
  </BrowserRouter>
      </Layout>
  
)
