import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layout';
import { Login, Register, Confirm, ForgetPassword } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Register />} />
          <Route path="olvide-password" element={<ForgetPassword />} />
          <Route path="confirmar/:id" element={<Confirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
