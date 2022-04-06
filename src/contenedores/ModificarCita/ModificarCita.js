import "./ModificarCita.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const ModificarCita = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navegar = useNavigate();
  //const history = useNavigate();
  const [cita, setCita] = useState({});
  const getCitas = async () => {
    const citasRes = await fetch(
      "https://veterinaria-back.herokuapp.com/citas/" + params.id,
      {
        method: "GET",
      }
    );
    const citaData = await citasRes.json();

    setCita(citaData);
    console.log(citaData, " dataaaaaaaaa");
  };
  useEffect(() => {
    try {
      getCitas();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      const formData = {
        descripcion: e.target[0].value,
        fechaDeVisita: e.target[1].value,
        estado: e.target[2].value,
      };

      const patchCita = await fetch(
        "https://veterinaria-back.herokuapp.com/citas/" + params.id,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (patchCita) {
        navegar("/areaCliente");
        dispatch({
          type: "VER_POPUP",
          payload: "Has modificado a " + cita.nombre_cita,
        });
        setTimeout(() => dispatch({ type: "CERRAR_POPUP" }), 3000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div>
      <h1>Modifica los datos de tu cita que deseas actualizar</h1>
      <form onSubmit={(e) => formSubmit(e)}>
        <label for="descripcion">Introduzca </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          defaultValue={cita.descripcion}
        />
        <label for="fechaDeVisita">Introduzca </label>
        <input 
         className="fecha"
         type="datetime-local"
         id="fechaDeVisita"
         name="fechaDeVisita"
         placeholder="aaaa-mm-dd hh:mm:ss"
         defaultValue={cita.fechaDeVisita}
         />
        <label for="estado">Introduzca </label>
        <input
          type="text"
          id="estado"
          name="estado"
          defaultValue={cita.estado}
        />
        <input type="submit" value="SEND" className="sendButton" />
      </form>
    </div>
  );
};

export default ModificarCita;

