import { useState } from 'react'
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { CreateTaskForm } from './components/create-task-form.tsx';
import { TaskList } from './components/task-list.tsx';
import { LoginPage } from './pages/login.tsx';
import { Routes, Route } from "react-router";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/crear' element={
      <ProtectedRoute>
      <CreateTaskForm />
    </ProtectedRoute>
      } />
    <Route path='/listar' element={
      <ProtectedRoute>
      <TaskList />
    </ProtectedRoute>
    } />
  </Routes>
  )
}

export default App
