import { useState, useEffect } from 'react';
import './App.css';
import { Button, Card } from './components/UI';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import DailyFocus from './components/DailyFocus';
import GoalProgress from './components/GoalProgress';

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

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('goals');
    const savedFocus = localStorage.getItem('dailyFocus');
    if (saved) setGoals(JSON.parse(saved));
    if (savedFocus) setDailyFocus(JSON.parse(savedFocus));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('dailyFocus', JSON.stringify(dailyFocus));
  }, [dailyFocus]);

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    setDailyFocus(dailyFocus.filter(id2 => id2 !== id));
  };

  const toggleDailyFocus = (goalId: string) => {
    if (dailyFocus.includes(goalId)) {
      setDailyFocus(dailyFocus.filter(id => id !== goalId));
    } else if (dailyFocus.length < 3) {
      setDailyFocus([...dailyFocus, goalId]);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Lifestyle Goals Planner</h1>
        <p>Your personal life operating system</p>
      </header>

      <div className="tab-navigation">
        <Button
          onClick={() => setActiveTab('goals')}
          className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
        >
          📋 My Goals
        </Button>
        <Button
          onClick={() => setActiveTab('daily')}
          className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
        >
          ⭐ Daily Focus
        </Button>
        <Button
          onClick={() => setActiveTab('progress')}
          className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
        >
          📊 Progress
        </Button>
      </div>

      <main className="app-main">
        {activeTab === 'goals' && (
          <div className="tab-content">
            <Card className="form-card">
              <h2>Add New Goal</h2>
              <GoalForm onAddGoal={addGoal} />
            </Card>
            <GoalList
              goals={goals}
              onUpdateGoal={updateGoal}
              onDeleteGoal={deleteGoal}
              onToggleFocus={toggleDailyFocus}
              dailyFocus={dailyFocus}
            />
          </div>
        )}

        {activeTab === 'daily' && (
          <DailyFocus
            goals={goals}
            dailyFocus={dailyFocus}
            onToggleFocus={toggleDailyFocus}
          />
        )}

        {activeTab === 'progress' && (
          <GoalProgress goals={goals} />
        )}
      </main>
    </div>
  );
}

export default App;
