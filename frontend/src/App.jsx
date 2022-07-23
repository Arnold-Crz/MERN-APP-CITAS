import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout, AuthLayout } from './layout';
import { Login, Register, Confirm, ForgetPassword, NewPassword } from './pages';
import { AdminPatients } from './pages/admin-pages';

import { AuthProvider, PacientesProvider } from './context';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="olvide-password" element={<ForgetPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<Confirm />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPatients />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
