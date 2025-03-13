import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationContextProvider } from './contexts/AuthenticationContext';
import { StoreContextProvider } from './contexts/StoreContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthenticationContextProvider>
      <StoreContextProvider>
        <App/>
      </StoreContextProvider>
    </AuthenticationContextProvider>
  </BrowserRouter>
)
