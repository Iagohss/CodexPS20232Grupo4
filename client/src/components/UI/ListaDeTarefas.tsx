import { useEffect, useState } from 'react'
import Tarefa from "./Tarefa"
import TodoForm from './TodoForm';
import Search from './Search';
import Filter from './Filter';
import { DadosComSenha, TTarefa, TarefaNoAutentication } from '../../util/types';
import { doDELETEtarefa } from '../../util/deleteTarefa';
import { doGETALLtarefa } from '../../util/getTarefas';
import { doPOSTtarefa } from '../../util/postTarefa';
import { doPUTtarefa } from '../../util/putTarefa';



const ListaDeTarefas = () => {
  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [email, setEmail] = useState("testeemail@email.com");
  const [senha, setSenha] = useState("senhateste");

  const postTarefa = async (newTarefa : TarefaNoAutentication) => {
    const dadosComSenha = {...newTarefa, usuarioEmail: email, usuarioSenha : senha};
    const nTarefa = await doPOSTtarefa(dadosComSenha);
    setTarefas([...tarefas, nTarefa]);
  };

  const putTarefa = async (newTarefa : TTarefa ) => {
    const dadosComSenha : DadosComSenha= {...newTarefa, usuarioSenha : senha};
    const nTarefa = await doPUTtarefa(dadosComSenha);
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === nTarefa.id ? nTarefa : tarefa 
    ));
  };

  const deleteTarefa = async (id : string) => {
    const autentication = {usuarioEmail: email, usuarioSenha : senha}
    doDELETEtarefa(autentication, id).then(() => {
      setTarefas(tarefas.filter(tarefa => 
        !(tarefa.id === id)
      ));
    });
  }

  useEffect(() => {
    async function fetchTarefas() {
      const newTarefas = await doGETALLtarefa();
      setTarefas(newTarefas);
    }
    fetchTarefas();
  },[]);

  return (
   <div className="app">
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