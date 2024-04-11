import { Link, Navigate, useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    return navigate("/tarefas");
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
            />
            <label htmlFor="senha">Sua senha:</label>
            <input  
                type="password" 
                id="senha"
                placeholder='Digite a sua senha'
            />
            <button type='submit'>OK</button>
        </form>
        <Link className="link-cadastro" to="/cadastro"> Cadastrar-se </Link>
    </div>
  )
}

export default Login