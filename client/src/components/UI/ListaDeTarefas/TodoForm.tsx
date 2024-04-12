import { useState } from "react";
import { TarefaNoAutentication } from "../../../util/types";

type AddTarefaProps = { addTarefa: (nt: TarefaNoAutentication) => void };
const TodoForm = (props: AddTarefaProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataLimite, setDataLimite] = useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTarefa: TarefaNoAutentication = {
      titulo: titulo,
      descricao: descricao,
      dataAdicionada: new Date(),
      dataLimite: dataLimite,
    };
    props.addTarefa(newTarefa);
    setTitulo("");
    setDescricao("");
    setDataLimite(new Date());
  };

  return (
    <div className="todo-form">
      <h2>Criar Tarefa:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Titulo:</label>
        <input
          type="Text"
          id="titulo"
          placeholder="Digite o título da tarefa"
          maxLength={70}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="Text"
          id="descricao"
          placeholder="Digite a descrição da tarefa"
          maxLength={200}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <label htmlFor="data">Data limite:</label>
        <input
          type="date"
          id="data"
          value={dataLimite.toISOString().substring(0, 10)}
          onChange={(e) => {
            if (e.target.value) setDataLimite(new Date(e.target.value));
          }}
        />
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
