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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'health',
    target: 100,
    progress: 0,
    dueDate: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('goals');
    const savedFocus = localStorage.getItem('dailyFocus');
    if (saved) setGoals(JSON.parse(saved));
    if (savedFocus) setDailyFocus(JSON.parse(savedFocus));
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // Save daily focus to localStorage
  useEffect(() => {
    localStorage.setItem('dailyFocus', JSON.stringify(dailyFocus));
  }, [dailyFocus]);

  const addGoal = () => {
    if (formData.title.trim()) {
      const newGoal: Goal = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setGoals([...goals, newGoal]);
      setFormData({
        title: '',
        description: '',
        category: 'health',
        target: 100,
        progress: 0,
        dueDate: ''
      });
    }
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    setDailyFocus(dailyFocus.filter(focusId => focusId !== id));
  };

  const toggleDailyFocus = (goalId: string) => {
    if (dailyFocus.includes(goalId)) {
      setDailyFocus(dailyFocus.filter(id => id !== goalId));
    } else if (dailyFocus.length < 3) {
      setDailyFocus([...dailyFocus, goalId]);
    }
  };

  const getCategoryEmoji = (cat: string) => {
    const emojis: Record<string, string> = {
      health: '🏃',
      fitness: '💪',
      career: '💼',
      learning: '📚',
      finance: '💰',
      personal: '🎯'
    };
    return emojis[cat] || '📌';
  };

  const focusGoals = goals.filter(g => dailyFocus.includes(g.id));
  const availableGoals = goals.filter(g => !dailyFocus.includes(g.id));
  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.target > 0 && (g.progress / g.target) >= 1).length,
    avgProgress: goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + (g.target > 0 ? (g.progress / g.target) * 100 : 0), 0) / goals.length) : 0,
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎯 Lifestyle Goals Planner</h1>
        <p>Your personal life operating system</p>
      </header>

      <nav className="nav">
        <button
          className={`nav-btn ${activeTab === 'goals' ? 'active' : ''}`}
          onClick={() => setActiveTab('goals')}
        >
          📋 My Goals
        </button>
        <button
          className={`nav-btn ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          ⭐ Daily Focus
        </button>
        <button
          className={`nav-btn ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Progress
        </button>
      </nav>

      <main className="main">
        {activeTab === 'goals' && (
          <div className="tab-content">
            <div className="form-card">
              <h2>Add New Goal</h2>
              <input
                type="text"
                placeholder="Goal title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input"
                rows={2}
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
              >
                <option value="health">🏃 Health</option>
                <option value="fitness">💪 Fitness</option>
                <option value="career">💼 Career</option>
                <option value="learning">📚 Learning</option>
                <option value="finance">💰 Finance</option>
                <option value="personal">🎯 Personal</option>
              </select>
              <input
                type="number"
                placeholder="Target"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || 0 })}
                className="input"
              />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input"
              />
              <button onClick={addGoal} className="btn btn-primary">✅ Create Goal</button>
            </div>

            {goals.length === 0 ? (
              <div className="empty-state">
                <p>No goals yet. Create your first goal! 🚀</p>
              </div>
            ) : (
              <div className="goals-grid">
                {goals.map((goal) => {
                  const percent = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
                  const isFocus = dailyFocus.includes(goal.id);
                  return (
                    <div key={goal.id} className="goal-card">
                      <div className="goal-header">
                        <h3>{getCategoryEmoji(goal.category)} {goal.title}</h3>
                        <button
                          onClick={() => toggleDailyFocus(goal.id)}
                          className="focus-btn"
                          title={isFocus ? 'Remove from daily focus' : 'Add to daily focus'}
                        >
                          {isFocus ? '⭐' : '☆'}
                        </button>
                      </div>
                      {goal.description && <p className="goal-desc">{goal.description}</p>}
                      {goal.dueDate && <p className="goal-date">📅 {new Date(goal.dueDate).toLocaleDateString()}</p>}
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${Math.min(percent, 100)}%` }}></div>
                      </div>
                      <p className="progress-text">{goal.progress} / {goal.target} ({Math.round(percent)}%)</p>
                      <div className="goal-actions">
                        <button onClick={() => updateGoal(goal.id, { progress: Math.max(0, goal.progress - 1) })} className="btn btn-sm">➖</button>
                        <button onClick={() => updateGoal(goal.id, { progress: Math.min(goal.target, goal.progress + 1) })} className="btn btn-sm">➕</button>
                        <button onClick={() => deleteGoal(goal.id)} className="btn btn-sm btn-danger">🗑️</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'daily' && (
          <div className="tab-content">
            <h2>🌟 Today's Focus (up to 3 goals)</h2>
            {focusGoals.length === 0 ? (
              <p className="empty-state">No focus goals yet. Select up to 3 goals below!</p>
            ) : (
              <div className="focus-goals">
                {focusGoals.map((goal, i) => (
                  <div key={goal.id} className="focus-card">
                    <div className="focus-number">{i + 1}</div>
                    <div className="focus-content">
                      <h4>{goal.title}</h4>
                      {goal.description && <p>{goal.description}</p>}
                    </div>
                    <button
                      onClick={() => toggleDailyFocus(goal.id)}
                      className="btn btn-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {availableGoals.length > 0 && (
              <div className="available-goals">
                <h3>📁 Available Goals</h3>
                {availableGoals.map(goal => {
                  const percent = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
                  return (
                    <div key={goal.id} className="available-item">
                      <div>
                        <strong>{getCategoryEmoji(goal.category)} {goal.title}</strong>
                        <p>{goal.progress}/{goal.target} • {Math.round(percent)}%</p>
                      </div>
                      <button
                        onClick={() => toggleDailyFocus(goal.id)}
                        className="btn btn-sm"
                      >
                        Add
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="tab-content">
            <h2>📊 Overall Statistics</h2>
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
                <h3>{stats.avgProgress}%</h3>
                <p>Avg Progress</p>
              </div>
            </div>
            <div className="overall-progress">
              <p>{stats.avgProgress}% Overall Progress</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${stats.avgProgress}%` }}></div>
              </div>
            </div>
            {goals.length > 0 && (
              <div className="recent-goals">
                <h3>📈 Recent Goals</h3>
                {goals.slice(0, 5).reverse().map(goal => {
                  const percent = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
                  return (
                    <div key={goal.id} className="recent-item">
                      <div>
                        <strong>{goal.title}</strong>
                        <p>{goal.category} • {goal.progress}/{goal.target}</p>
                      </div>
                      <span className={percent >= 100 ? 'status-done' : 'status-progress'}>
                        {percent >= 100 ? '✅ Done' : `${Math.round(percent)}%`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
