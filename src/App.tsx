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

  function handleRegister() {
    if (!input) {
    }

    setTasks((tarefas) => [...tarefas, input]);
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
      <button onClick={handleRegister}>Adicionar tarefa</button>
      <hr />

      {tasks.map((item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button>Excluir</button>
        </section>
      ))}
    </div>
  );
}
