import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TUsuario } from "../../../util/types";
import { doPOSTusuario } from "../../../util/postUsuario";
import { AuthContext } from "../../context/Context";

const Cadastro = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [restoNome, setRestoNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [genero, setGenero] = useState("Masculino"); 
  const [senha, setSenha] = useState(""); 
  
  const handleSubmit = async (e : React.FormEvent) => {
      e.preventDefault();
      const newUser: TUsuario = {
        email: email,
        primeiroNome: primeiroNome,
        restoNome: restoNome,
        dataNascimento: dataNascimento,
        genero: genero,
        senha: senha
      };
      
      try {
        const user = await doPOSTusuario(newUser);
        context!.setEmail(user.email);
        context!.setSenha(user.senha)
        return navigate("/tarefas");
      } catch (error : any){
        setSenha("");
      }
  };


  return (
    <div className="cadastro-form" onSubmit={handleSubmit}>
        <h1>Realize seu Cadastro</h1>
        <form >
            <label htmlFor="nome">Primeiro nome:</label>
            <input  
                type="Text" 
                id='nome'
                placeholder='Digite o seu nome'
                value={primeiroNome}
                onChange={(e)=> setPrimeiroNome(e.target.value)}
            />
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input  
                type="Text" 
                id='sobrenome'
                placeholder='Digite o seu sobrenome'
                value={restoNome}
                onChange={(e)=> setRestoNome(e.target.value)}
            />
            <label htmlFor="genero">Genero:</label>
            <select 
                id="genero" 
                name="genero" 
                value={genero}
                onChange={(e)=> setGenero(e.target.value)}
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nao binario">Não binário</option>
              <option value="Outro">Outro</option>
              <option value="nao informado">Prefiro não informar</option>
            </select>
            <label htmlFor="data">Data de nascimento:</label>
            <input  
                type="date" 
                id="data"
                value={dataNascimento.toISOString().substring(0,10)}
                onChange={(e)=> {
                  if (e.target.value) setDataNascimento(new Date(e.target.value))
                }}
            />
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
            <button type='submit'>Cadastrar novo usuário</button>
        </form>
        <Link className="link-cadastro" to="/"> Já possui uma conta </Link>
    </div>
  )
}

export default Cadastro