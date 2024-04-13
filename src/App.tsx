import { useState, useEffect, useRef, useMemo } from "react";

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify(tasks));
  }, [tasks]);

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
    inputRef.current?.focus();
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

  const totalTarefas = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        placeholder="Insira uma tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
      />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar Tarefa" : "Adicionar Tarefa"}
      </button>
      <hr />
      <strong>Você tem {totalTarefas} tarefas!</strong>
      <br />
      <br />

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
