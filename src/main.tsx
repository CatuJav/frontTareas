import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter} from "react-router";
import { AuthProvider } from './hooks/useAuth.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <AuthProvider>
     <App />
    </AuthProvider>
  </BrowserRouter>


)
