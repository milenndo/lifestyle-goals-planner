import { Card, Button } from './UI';

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

interface GoalListProps {
  goals: Goal[];
  onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
  onDeleteGoal: (id: string) => void;
  onToggleFocus: (id: string) => void;
  dailyFocus: string[];
}

const GoalList = ({ goals, onUpdateGoal, onDeleteGoal, onToggleFocus, dailyFocus }: GoalListProps) => {
  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      health: '🏃',
      fitness: '💪',
      career: '💼',
      learning: '📚',
      finance: '💰',
      personal: '🎯',
    };
    return emojis[category] || '📌';
  };

  if (goals.length === 0) {
    return (
      <Card className="empty-state">
        <p>No goals yet. Create your first goal to get started! 🚀</p>
      </Card>
    );
  }

  return (
    <div className="goals-grid">
      {goals.map(goal => {
        const progressPercent = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
        const isFocus = dailyFocus.includes(goal.id);
        return (
          <Card key={goal.id} className={`goal-card ${isFocus ? 'focus-goal' : ''}`}>
            <div className="goal-header">
              <div className="goal-title-section">
                <span className="category-emoji">{getCategoryEmoji(goal.category)}</span>
                <h3>{goal.title}</h3>
              </div>
              <button
                className={`focus-btn ${isFocus ? 'active' : ''}`}
                onClick={() => onToggleFocus(goal.id)}
                title="Mark as daily focus"
              >
                {isFocus ? '⭐' : '☆'}
              </button>
            </div>

            {goal.description && <p className="goal-description">{goal.description}</p>}

            <div className="goal-meta">
              {goal.dueDate && <span className="due-date">📅 {new Date(goal.dueDate).toLocaleDateString()}</span>}
              <span className="category-badge">{goal.category}</span>
            </div>

            <div className="progress-section">
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
              </div>
              <div className="progress-info">
                <span>{goal.progress} / {goal.target}</span>
                <span className="progress-percent">{Math.round(progressPercent)}%</span>
              </div>
            </div>

            <div className="goal-actions">
              <button
                className="action-btn decrease"
                onClick={() => onUpdateGoal(goal.id, { progress: Math.max(0, goal.progress - 1) })}
              >
                ➖
              </button>
              <button
                className="action-btn increase"
                onClick={() => onUpdateGoal(goal.id, { progress: Math.min(goal.target, goal.progress + 1) })}
              >
                ➕
              </button>
              <Button
                onClick={() => onDeleteGoal(goal.id)}
                className="delete-btn"
              >
                🗑️
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default GoalList;
