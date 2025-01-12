import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListadoUsuario from "./contenedores/EjemploListado/ejemploListado.js";
import CrearUsuario from "./contenedores/CrearUsuario/CrearUsuario.js";
import LoginUsuario from "./contenedores/LoginUsuario/LoginUsuario.js";
import Home from "./componentes/Home/Home.js";
import RegistroMascota from "./contenedores/RegistroMascota/RegistroMascota.js";
import VistaCliente from "./componentes/VistaCliente/VistaCliente";
import InfoMascotas from "./contenedores/InfoMascotas/InfoMascotas";
import CrearCita from "./contenedores/CrearCita/CrearCita.js";
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";
import InfoCitas from "./contenedores/InfoCitas/InfoCitas";
import PopUp from "./contenedores/PopUp/PopUp";
import ModificarMascota from "./contenedores/ModificarMascota/ModificarMascota.js";
import ModificarCita from "./contenedores/ModificarCita/ModificarCita.js";
import ModificarUsuario from "./contenedores/ModificarUsuario/ModificarUsuario";
import TodasCitas from "./contenedores/ListadoTodasCitas/TodasCitas.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginUsuario />}></Route>
          <Route path="/registroMascota" element={<RegistroMascota />}></Route>
          <Route path="/registro" element={<CrearUsuario />}></Route>
          <Route
            path="/modificarUsuario/:id"
            element={<ModificarUsuario />}
          ></Route>
          <Route path="/listado" element={<ListadoUsuario />}></Route>
          <Route path="/areaCliente" element={<VistaCliente />}></Route>
          <Route path="/mascotas" element={<InfoMascotas />}></Route>
          <Route path="/crearCita" element={<CrearCita />}></Route>
          <Route path="/verCitas/:id" element={<InfoCitas />}></Route>
          <Route
            path="/modificarMascota/:id"
            element={<ModificarMascota />}
          ></Route>
          <Route path="/modificarCita/:id" element={<ModificarCita />}></Route>
          <Route path="/citascompleto" element={<TodasCitas />}></Route>
        </Routes>
        <PopUp />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
