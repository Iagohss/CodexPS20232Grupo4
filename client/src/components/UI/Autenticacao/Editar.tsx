import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dadosPUTusuario } from "../../../util/types";
import { AuthContext } from "../../context/Context";
import { doPUTusuario } from "../../../util/putUsuario";

const Editar = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [primeiroNome, setPrimeiroNome] = useState("");
  const [restoNome, setRestoNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [genero, setGenero] = useState("Masculino"); 
  const [senha, setSenha] = useState(""); 
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (context!.email == "" || context!.senha == "")
      return navigate("/");
  },[]);  

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    const newUser: dadosPUTusuario = {
      email: context!.email,
      primeiroNome: primeiroNome,
      restoNome: restoNome,
      dataNascimento: dataNascimento,
      genero: genero,
      senhaAntiga: context!.senha,
      senhaNova: senha
    };
  
    try {
      if (!newUser.senhaNova) throw "senha vazia";
      const user = await doPUTusuario(newUser);
      context!.setSenha(user.senha);
    } catch (error : any){
      setSenha("");
      setError(true);
    }
};

return (
  <div className="editar-form" onSubmit={handleSubmit}>
      <h1>Edite suas informações</h1>
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
          <label htmlFor="senha">Nova senha:</label>
          <input  
              type="password" 
              id="senha"
              placeholder='Digite a sua nova senha'
              value={senha}
              onChange={(e)=> setSenha(e.target.value)}
          />
          <p className="erro">{
            error
              ? "Informações de usuário inválidas!"
              : ""
            }</p>
          <button type='submit'>Editar perfil</button>
      </form>
      <Link className="link-tarefas" to="/tarefas"> Ver suas tarefas </Link>
  </div>
)
}

export default Editar