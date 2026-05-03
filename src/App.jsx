import { useState } from "react";

export default function App() {
  const [income, setIncome] = useState(211);
  const [tasks, setTasks] = useState([
    "Post 1 YouTube Short",
    "Write Income Report",
    "Workout or jog",
  ]);
  const [newTask, setNewTask] = useState("");

  const target = 1000;
  const progress = Math.min((income / target) * 100, 100);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([newTask, ...tasks]);
    setNewTask("");
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      <h1 style={{ fontSize: 40, marginBottom: 20 }}>
        Harness Dashboard
      </h1>

      {/* INCOME */}
      <div style={{ marginBottom: 30 }}>
        <h2>Weekly Income</h2>
        <p style={{ fontSize: 28 }}>${income}</p>

        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          style={{ padding: 10, marginTop: 10 }}
        />

        <div style={{ background: "#1e293b", height: 20, width: "100%", borderRadius: 10, marginTop: 15 }}>
          <div
            style={{
              width: `${progress}%`,
              background: "#22c55e",
              height: "100%",
              borderRadius: 10,
            }}
          />
        </div>

        <p style={{ marginTop: 10 }}>
          {progress.toFixed(1)}% to $1,000/week goal
        </p>
      </div>

      {/* PORTFOLIO */}
      <div style={{ marginBottom: 30 }}>
        <h2>Portfolio Focus</h2>
        <ul>
          <li>Continue buying MSTY weekly</li>
          <li>Reinvest dividends</li>
          <li>Target $1,000/week income</li>
        </ul>
      </div>

      {/* CONTENT */}
      <div style={{ marginBottom: 30 }}>
        <h2>Content System</h2>
        <ul>
          <li>Monday: Income Report</li>
          <li>Wednesday: Stock Deep Dive</li>
          <li>Friday: System Post</li>
          <li>Daily: YouTube Shorts</li>
        </ul>
      </div>

      {/* HEALTH */}
      <div style={{ marginBottom: 30 }}>
        <h2>Health Targets</h2>
        <ul>
          <li>3 workouts per week</li>
          <li>3 jogs per week</li>
          <li>Improve sleep consistency</li>
        </ul>
      </div>

      {/* TASKS */}
      <div>
        <h2>Daily Tasks</h2>

        <div style={{ marginBottom: 10 }}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add task"
            style={{ padding: 10, marginRight: 10 }}
          />
          <button onClick={addTask} style={{ padding: 10 }}>
            Add
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}