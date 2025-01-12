import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";
import "./RegistroMascota.css";

const RegistroMascota = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const formSubmit = async (e) => {
    // Al hacer submit no refresca de nuevo la pagina
    e.preventDefault();
    try {
      const formData = {
        nombre_mascota: e.target[0].value,
        peso: e.target[1].value,
        fecha_nacimiento: e.target[2].value,
        doctor: e.target[3].value,
        idUsuario: localStorage.getItem("id"),
      };

      const crearMascota = await fetch(
        "https://veterinaria-back.herokuapp.com/mascotas",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const mascotaCreada = await crearMascota.json();
      if (crearMascota) {
        dispatch(
          actionCreator(
            VER_POPUP,
            "Has creado a  " + mascotaCreada.nombre_mascota
          )
        );
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 2000);
        setTimeout(() => navegar("/areaCliente"), 3000);
      }
    } catch (error) {
      dispatch(
        actionCreator(VER_POPUP, "Oooops ha ocurrido algo inesperado  " + error)
      );
      setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 2000);
      //alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div className="crearMascota">
      <h1 className="h1registroMascota">Registro de Mascotas Cute</h1>
      <form onSubmit={(e) => formSubmit(e)} className="formcrearMascota">
        <label htmlFor="nombre_mascota">nombre_mascota</label>
        <input type="text" id="nombre_mascota" name="nombre_mascota" />
        <label htmlFor="peso">peso</label>
        <input type="text" id="peso" name="peso" />
        <label htmlFor="fecha_nacimiento">fecha_nacimiento</label>
        <input type="text" id="fecha_nacimiento" name="fecha_nacimiento" />
        <label htmlFor="doctor">doctor</label>
        <input type="text" id="doctor" name="doctor" />
        <input type="submit" value="SEND" className="botonCrearMascota" />
      </form>
    </div>
  );
};

export default RegistroMascota;
