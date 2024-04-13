import { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: "",
  });

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@cursoreact");
    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
  }, []);

  function handleRegister() {
    if (!input) {
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }
    setTasks((tarefas) => [...tarefas, input]);
    setInput("");
    localStorage.setItem("@cursoreact", JSON.stringify([...tasks, input]));
  }
  function handleDelet(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
    localStorage.setItem("@cursoreact", JSON.stringify(removeTask));
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
    localStorage.setItem("@cursoreact", JSON.stringify(allTasks));
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
