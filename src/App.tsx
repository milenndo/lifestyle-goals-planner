import { useState, useEffect } from 'react';
import './App.css';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  target: number;
  progress: number;
  dueDate: string;
  createdAt: string;
}

function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [dailyFocus, setDailyFocus] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('goals');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('health');
  const [target, setTarget] = useState(100);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('goals');
    if (saved) setGoals(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (title.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title,
        description,
        category,
        target,
        progress: 0,
        dueDate,
        createdAt: new Date().toISOString(),
      };
      setGoals([...goals, newGoal]);
      setTitle('');
      setDescription('');
      setCategory('health');
      setTarget(100);
      setDueDate('');
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateProgress = (id: string, delta: number) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, progress: Math.max(0, Math.min(g.target, g.progress + delta)) } : g
    ));
  };

  const toggleFocus = (id: string) => {
    if (dailyFocus.includes(id)) {
      setDailyFocus(dailyFocus.filter(x => x !== id));
    } else if (dailyFocus.length < 3) {
      setDailyFocus([...dailyFocus, id]);
    }
  };

  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.progress >= g.target).length,
    avg: goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + (g.target > 0 ? (g.progress / g.target) * 100 : 0), 0) / goals.length) : 0
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Lifestyle Goals Planner</h1>
        <p>Your personal life operating system</p>
      </header>

      <nav className="nav">
        <button className={activeTab === 'goals' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('goals')}>
          My Goals
        </button>
        <button className={activeTab === 'daily' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('daily')}>
          Daily Focus
        </button>
        <button className={activeTab === 'progress' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('progress')}>
          Progress
        </button>
      </nav>

      <main className="main">
        {activeTab === 'goals' && (
          <div className="tab-content">
            <div className="form-card">
              <h2>Add New Goal</h2>
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input" rows={2} />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                <option value="health">Health</option>
                <option value="fitness">Fitness</option>
                <option value="career">Career</option>
                <option value="learning">Learning</option>
                <option value="finance">Finance</option>
              </select>
              <input type="number" placeholder="Target" value={target} onChange={(e) => setTarget(parseInt(e.target.value) || 0)} className="input" />
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input" />
              <button onClick={addGoal} className="btn btn-primary">Create Goal</button>
            </div>

            <div className="goals-grid">
              {goals.length === 0 ? (
                <p className="empty">No goals yet. Create your first goal!</p>
              ) : (
                goals.map(goal => (
                  <div key={goal.id} className="goal-card">
                    <div className="goal-header">
                      <h3>{goal.title}</h3>
                      <button onClick={() => toggleFocus(goal.id)} className="focus-btn">
                        {dailyFocus.includes(goal.id) ? '★' : '☆'}
                      </button>
                    </div>
                    {goal.description && <p>{goal.description}</p>}
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${Math.min((goal.progress/goal.target)*100, 100)}%`}}></div>
                    </div>
                    <p>{goal.progress}/{goal.target}</p>
                    <div className="actions">
                      <button onClick={() => updateProgress(goal.id, -1)} className="btn btn-sm">-</button>
                      <button onClick={() => updateProgress(goal.id, 1)} className="btn btn-sm">+</button>
                      <button onClick={() => deleteGoal(goal.id)} className="btn btn-sm btn-danger">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'daily' && (
          <div className="tab-content">
            <h2>Daily Focus</h2>
            {dailyFocus.length === 0 ? (
              <p>No goals selected for daily focus</p>
            ) : (
              <div className="focus-list">
                {dailyFocus.map((id, idx) => {
                  const goal = goals.find(g => g.id === id);
                  return goal ? (
                    <div key={id} className="focus-item">
                      <span className="num">{idx + 1}</span>
                      <div>
                        <h4>{goal.title}</h4>
                        <p>{goal.category}</p>
                      </div>
                      <button onClick={() => toggleFocus(id)} className="btn btn-sm">Remove</button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="tab-content">
            <h2>Progress</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.total}</h3>
                <p>Total Goals</p>
              </div>
              <div className="stat-card">
                <h3>{stats.completed}</h3>
                <p>Completed</p>
              </div>
              <div className="stat-card">
                <h3>{stats.avg}%</h3>
                <p>Avg Progress</p>
              </div>
            </div>
            <div className="overall">
              <h3>Overall Progress: {stats.avg}%</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${stats.avg}%`}}></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
