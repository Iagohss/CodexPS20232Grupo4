import { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import Tarefa from "./Tarefa"
import TodoForm from './TodoForm';
import Search from './Search';
import Filter from './Filter';
import Header from './Header';
import { DadosComSenha, TTarefa, TarefaNoAutentication } from '../../../util/types';
import { doDELETEtarefa } from '../../../util/deleteTarefa';
import { doGETALLtarefa } from '../../../util/getTarefas';
import { doPOSTtarefa } from '../../../util/postTarefa';
import { doPUTtarefa } from '../../../util/putTarefa';
import { AuthContext } from '../../context/Context';

const ListaDeTarefas = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (context!.email == "" || context!.senha == ""){
      return navigate("/");
    }

    async function fetchTarefas() {
      const autentication = {usuarioEmail: context!.email, usuarioSenha : context!.senha}
      const newTarefas = await doGETALLtarefa(autentication);
      setTarefas(newTarefas);
    }
    fetchTarefas();
  },[]);

  const postTarefa = async (newTarefa : TarefaNoAutentication) => {
    const dadosComSenha = {...newTarefa, usuarioEmail: context!.email, usuarioSenha : context!.senha};
    const nTarefa = await doPOSTtarefa(dadosComSenha);
    setTarefas([...tarefas, nTarefa]);
  };

  const putTarefa = async (newTarefa : TTarefa ) => {
    const dadosComSenha : DadosComSenha= {...newTarefa, usuarioSenha : context!.senha};
    const nTarefa = await doPUTtarefa(dadosComSenha);
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === nTarefa.id ? nTarefa : tarefa 
    ));
  };

  const deleteTarefa = async (id : string) => {
    const autentication = {usuarioEmail: context!.email, usuarioSenha : context!.senha}
    doDELETEtarefa(autentication, id).then(() => {
      setTarefas(tarefas.filter(tarefa => 
        !(tarefa.id === id)
      ));
    });
  }

  return (
   <div className="app">
    <Header></Header>
    <h1>Lista de tarefas</h1>
    <div className="flex-container">
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter}/>
    </div>
    <div className="todo-list">
      {tarefas
      .filter((tarefa) => 
        filter === "All" 
          ? true 
          : filter === "Completed" 
          ? tarefa.dataConclusao 
          : !tarefa.dataConclusao
      )
      .filter((tarefa) => 
        tarefa.titulo.toLowerCase().includes(search.toLowerCase()) ||
        tarefa.descricao.toLowerCase().includes(search.toLowerCase())
      )
      .map((tarefa) => (
          <Tarefa 
            key={tarefa.id} 
            tarefa={tarefa}
            completeTarefa={putTarefa}
            removeTarefa={deleteTarefa}
          />
      ))}
    </div>
    <TodoForm addTarefa={postTarefa}/>
   </div>
   );
}

export default ListaDeTarefas