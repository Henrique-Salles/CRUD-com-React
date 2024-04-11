import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    "Estudar react com typescript",
    "Assistir aulas da faculdade",
    "Aulas de inglês com Duolingo",
    "Procurar vagas de emprego ou estágio",
    "Varrer a casa",
    "Tirar o lixo",
    "Ajudar no almoço",
  ]);
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: "",
  });

  function handleRegister() {
    if (!input) {
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }
    setTasks((tarefas) => [...tarefas, input]);
    setInput("");
  }
  function handleDelet(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }
  function handleEdit(item: string) {
    setInput(item);
    setEditTask({
      enabled: true,
      task: item,
    });
  }
  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex((task) => task === editTask.task);
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setEditTask({
      enabled: false,
      task: "",
    });

    setInput("");
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        placeholder="Insira uma tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar Tarefa" : "Adicionar Tarefa"}
      </button>
      <hr />

      {tasks.map((item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelet(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}
