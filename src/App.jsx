import { useMemo, useState } from "react";

export default function App() {
  const [weeklyIncome, setWeeklyIncome] = useState(211);
  const [portfolioValue, setPortfolioValue] = useState(52000);
  const [weeklyInvestment, setWeeklyInvestment] = useState(500);
  const [youtubeShorts, setYoutubeShorts] = useState(0);
  const [substackPosts, setSubstackPosts] = useState(0);
  const [workouts, setWorkouts] = useState(0);
  const [jogs, setJogs] = useState(0);

  const weeklyGoal = 1000;
  const incomeProgress = Math.min((weeklyIncome / weeklyGoal) * 100, 100);

  const estimatedWeeks = useMemo(() => {
    const gap = weeklyGoal - weeklyIncome;
    if (gap <= 0) return 0;
    const estimatedWeeklyIncomeAdded = weeklyInvestment * 0.012;
    return Math.ceil(gap / estimatedWeeklyIncomeAdded);
  }, [weeklyIncome, weeklyInvestment]);

  const cards = [
    ["Weekly Income", `$${weeklyIncome}`, `${incomeProgress.toFixed(1)}% to goal`],
    ["Portfolio Value", `$${portfolioValue.toLocaleString()}`, "Current base"],
    ["Weekly Investment", `$${weeklyInvestment}`, "Capital added"],
    ["Est. Weeks to Goal", estimatedWeeks, "Rough estimate"],
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.badge}>Personal Operating System</p>
        <h1 style={styles.title}>Harness Dashboard</h1>
        <p style={styles.subtitle}>
          Track your money, content, health, and momentum in one place.
        </p>
        const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});<h1 style={styles.title}>Harness Dashboard</h1><p style={{ color: "#94a3b8", marginBottom: 20 }}>
  {today}
</p>

        <div style={styles.grid4}>
          {cards.map(([label, value, note]) => (
            <div style={styles.card} key={label}>
              <p style={styles.cardLabel}>{label}</p>
              <h2 style={styles.cardValue}>{value}</h2>
              <p style={styles.note}>{note}</p>
            </div>
          ))}
        </div>

        <section style={styles.section}>
          <h2>Income Goal</h2>
          <div style={styles.progressOuter}>
            <div style={{ ...styles.progressInner, width: `${incomeProgress}%` }} />
          </div>
          <p style={styles.note}>
            ${weeklyIncome} / ${weeklyGoal} per week
          </p>

          <div style={styles.inputs}>
            <Input label="Weekly Income" value={weeklyIncome} setValue={setWeeklyIncome} />
            <Input label="Portfolio Value" value={portfolioValue} setValue={setPortfolioValue} />
            <Input label="Weekly Investment" value={weeklyInvestment} setValue={setWeeklyInvestment} />
          </div>
        </section>

        <div style={styles.grid2}>
          <section style={styles.section}>
            <h2>Content System</h2>
            <Tracker label="YouTube Shorts This Week" value={youtubeShorts} setValue={setYoutubeShorts} goal={7} />
            <Tracker label="Substack Posts This Week" value={substackPosts} setValue={setSubstackPosts} goal={3} />
            <ul>
              <li>Monday: Income Report</li>
              <li>Wednesday: Stock Deep Dive</li>
              <li>Friday: System Post</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2>Health System</h2>
            <Tracker label="Workouts This Week" value={workouts} setValue={setWorkouts} goal={3} />
            <Tracker label="Jogs This Week" value={jogs} setValue={setJogs} goal={3} />
            <ul>
              <li>Improve energy</li>
              <li>Lose 10 lbs</li>
              <li>Build muscle</li>
            </ul>
          </section>
        </div>

        <div style={styles.grid2}>
          <section style={styles.section}>
            <h2>Portfolio Focus</h2>
            <ul>
              <li>Keep building weekly income</li>
              <li>Track MSTY income contribution</li>
              <li>Reinvest dividends when possible</li>
              <li>Avoid emotional selling</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2>Life Audit Focus</h2>
            <div style={styles.lifeGrid}>
              <Score area="Health" score={5} />
              <Score area="Mind" score={4} />
              <Score area="Marriage" score={7} />
              <Score area="Friends" score={3} />
              <Score area="Career" score={2} />
              <Score area="Finances" score={6} />
              <Score area="Fun" score={4} />
            </div>
          </section>
        </div>

        <section style={styles.section}>
          <h2>Today’s Focus</h2>
          <div style={styles.focusGrid}>
            <Focus item="Buy or research income-producing shares" />
            <Focus item="Post one short-form video" />
            <Focus item="Move your body for 30 minutes" />
            <Focus item="Do one thing that improves the house" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Input({ label, value, setValue }) {
  return (
    <label style={styles.inputGroup}>
      <span>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={styles.input}
      />
    </label>
  );
}

function Tracker({ label, value, setValue, goal }) {
  const progress = Math.min((value / goal) * 100, 100);

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={styles.trackerTop}>
        <strong>{label}</strong>
        <span>
          {value}/{goal}
        </span>
      </div>
      <div style={styles.progressOuterSmall}>
        <div style={{ ...styles.progressInner, width: `${progress}%` }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button style={styles.smallButton} onClick={() => setValue(Math.max(0, value - 1))}>
          -
        </button>
        <button style={styles.smallButton} onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

function Score({ area, score }) {
  return (
    <div style={styles.scoreBox}>
      <span>{area}</span>
      <strong>{score}/10</strong>
    </div>
  );
}

function Focus({ item }) {
  return <div style={styles.focusItem}>✓ {item}</div>;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: 24,
  },
  container: {
    maxWidth: 1150,
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    background: "#064e3b",
    color: "#a7f3d0",
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 13,
  },
  title: {
    fontSize: 48,
    margin: "16px 0 8px",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 18,
    marginBottom: 24,
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 18,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 16,
    marginBottom: 18,
  },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 18,
    padding: 20,
  },
  cardLabel: {
    color: "#94a3b8",
    margin: 0,
  },
  cardValue: {
    fontSize: 32,
    margin: "8px 0",
  },
  note: {
    color: "#94a3b8",
  },
  section: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
  },
  progressOuter: {
    background: "#1e293b",
    height: 24,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressOuterSmall: {
    background: "#1e293b",
    height: 12,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressInner: {
    background: "#22c55e",
    height: "100%",
    borderRadius: 999,
  },
  inputs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginTop: 18,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    color: "#cbd5e1",
  },
  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    fontSize: 16,
  },
  trackerTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  smallButton: {
    marginRight: 8,
    padding: "6px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  lifeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 10,
  },
  scoreBox: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    justifyContent: "space-between",
  },
  focusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
  },
  focusItem: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 14,
  },
};
