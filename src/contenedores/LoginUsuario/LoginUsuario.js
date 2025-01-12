import { useNavigate } from "react-router-dom";
import "./LoginUsuario.css";
import { Link } from "react-router-dom";
import store from "../../store/store.js";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, USER_LOGGED, VER_POPUP } from "../../store/types";

const LoginUsuario = () => {
  const navegar = useNavigate();
  const dispatch = useDispatch();
  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      const formData = {
        email: e.target[0].value,
        contraseña: e.target[1].value,
      };

      let loginUser = await fetch(
        "https://veterinaria-back.herokuapp.com/usuarios/login",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      loginUser = await loginUser.json();

      if (loginUser) {
        localStorage.setItem("token", loginUser.token);
        localStorage.setItem("id", loginUser.id);
        localStorage.setItem("rol", loginUser.rol);
        if (localStorage.getItem("rol") == "admin") {
          navegar("/citascompleto");
        } else {
          dispatch(actionCreator(USER_LOGGED));
          dispatch(
            actionCreator(VER_POPUP, "Te has logeado correctamente. Bienvenido")
          );
          setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
          navegar("/areaCliente");
        }
      } else {
        alert("Usuario y/o contraseña incorrecto.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginUsuario">
      <h2 className="h2login">LOGIN DE USUARIO</h2>
      <form onSubmit={(e) => formSubmit(e)} className="formUsuario">
        <label className="labelUsuario" htmlFor="email">
          Email
        </label>
        <input className="inputUsuario" type="email" id="email" name="email" />
        <label className="labelUsuario" htmlFor="contraseña">
          Contraseña
        </label>
        <input
          className="inputUsuario"
          type="password"
          id="contraseña"
          name="contraseña"
        />
        <input type="submit" value="Entrar" className="botonUsuario" />
      </form>
    </div>
  );
};

export default LoginUsuario;
