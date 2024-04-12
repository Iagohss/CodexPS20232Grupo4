import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import { TUsuario } from "../../../util/types";
import { doGETusuario } from "../../../util/getUsuario";

const Header = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleEditar = () => {
    return navigate('/editar');
    };

  const handleDeslogar = () => {
    context!.setEmail("");
    context!.setSenha("");
    return navigate('/');
    };

    useEffect(() => {
    async function fetchUser() {
      const user : TUsuario = await doGETusuario(context!.email);
      setName(user.primeiroNome.concat(" ", user.restoNome));
    }
    fetchUser();
  },[]);
  
  return (
    <div className="header">
        <p className="Bem-vindo">Bem vindo, {name}!</p>
        <button className="link-editar" onClick={handleEditar}> Editar perfil </button>
        <button className="deslogar" onClick={handleDeslogar}> Sair </button>
    </div>
  );
}

export default Header