import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import { doGETusuario } from "../../../util/getUsuario";

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await doGETusuario(email);
      if (user.senha != senha) {
        throw "Senha invalida";
      }
      context!.setEmail(user.email);
      context!.setSenha(user.senha)
      return navigate("/tarefas");
    }catch (error : any) {
      setError(true);
      setEmail("");
      setSenha("");
    }
  };

  return (
    <div className="login-form">
        <h1>Realize seu Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Seu email:</label>
            <input  
                type="Text" 
                id='email'
                placeholder='Digite o seu email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            <label htmlFor="senha">Sua senha:</label>
            <input  
                type="password" 
                id="senha"
                placeholder='Digite a sua senha'
                value={senha}
                onChange={(e)=> setSenha(e.target.value)}
            />
            <p className="erro">{
            error
              ? "Email e senha incorretos!"
              : ""
            }</p>
            <button type='submit'>Realizar login</button>
        </form>
        <Link className="link-cadastro" to="/cadastro"> Cadastrar-se </Link>
    </div>
  )
}

export default Login