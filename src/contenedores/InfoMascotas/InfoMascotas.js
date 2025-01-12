import "./InfoMascotas.css";
import { useEffect, useState } from "react";
import CrearCita from "../CrearCita/CrearCita";
import ModificarMascota from "../ModificarMascota/ModificarMascota.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import getMascotas from "../../Servicios/getMascotas";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const InfoMascotas = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  useEffect(() => {
    const loadMascotas = async () => {
      try {
        const mascotas = await getMascotas();
        setMascotas(mascotas);
      } catch (error) {
        console.log(error);
      }
    };
    loadMascotas();
  }, []);
  const borrarMascota = async (idmascota) => {
    try {
      const deleteMascota = await fetch(
        "https://veterinaria-back.herokuapp.com/mascotas/" + idmascota,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const mascotas = await getMascotas();
      setMascotas(mascotas);
      if (deleteMascota) {
        dispatch(
          actionCreator(VER_POPUP, "Has borrado la mascota correctamente")
        );
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };

  return (
    <div className="mascotasCard">
      {mascotas.map((mascota) => {
        return (
          <div className="infoMascotas">
            <h3>Datos de {mascota.nombre_mascota}</h3>
            <tr>
              <th>Nombre de la mascota</th>
              <td>{mascota.nombre_mascota}</td>
              <th>Peso</th>
              <td>{mascota.peso}</td>
              <th>Fecha de nacimiento</th>
              <td>{mascota.fecha_nacimiento}</td>
              <th>Doctor</th>
              <td>{mascota.doctor}</td>
            </tr>
            <div className="botonesOpciones">
              <button
                type="button"
                className="botonOpcionesMascotas"
                onClick={() => navegar("/modificarMascota/" + mascota.id)}
              >
                Modificar datos de mascota
              </button>

              <button
                type="button"
                className="botonOpcionesMascotas"
                onClick={() => borrarMascota(mascota.id)}
              >
                Eliminar mascota
              </button>
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={() => navegar("/verCitas/" + mascota.id)}
              >
                Ver citas
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoMascotas;
