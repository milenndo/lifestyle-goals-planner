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

interface DailyFocusProps {
  goals: Goal[];
  dailyFocus: string[];
  onToggleFocus: (id: string) => void;
}

const DailyFocus = ({ goals, dailyFocus, onToggleFocus }: DailyFocusProps) => {
  const focusGoals = goals.filter(g => dailyFocus.includes(g.id));
  const availableGoals = goals.filter(g => !dailyFocus.includes(g.id));

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

  return (
    <div className="daily-focus-container">
      <Card className="focus-card">
        <h2>🌟 Today's Focus</h2>
        <p className="subtitle">Select up to 3 goals to focus on today</p>

        {focusGoals.length === 0 ? (
          <div className="empty-focus">
            <p>No goals selected for today. Pick up to 3 goals below to start!</p>
          </div>
        ) : (
          <div className="focus-goals-display">
            {focusGoals.map((goal, index) => (
              <div key={goal.id} className="focus-goal-item">
                <div className="focus-number">{index + 1}</div>
                <div className="focus-goal-content">
                  <h4>{goal.title}</h4>
                  <p>{goal.description}</p>
                </div>
                <button
                  className="remove-focus-btn"
                  onClick={() => onToggleFocus(goal.id)}
                  title="Remove from daily focus"
                >
                  ✗
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="available-goals-card">
        <h3>📁 Available Goals</h3>
        {availableGoals.length === 0 ? (
          <p>All your goals are in focus! Create more goals or remove some from focus.</p>
        ) : (
          <div className="available-goals-list">
            {availableGoals.map(goal => (
              <div key={goal.id} className="available-goal-item">
                <div className="available-goal-info">
                  <span className="emoji">{getCategoryEmoji(goal.category)}</span>
                  <div>
                    <h4>{goal.title}</h4>
                    {goal.description && <p>{goal.description}</p>}
                  </div>
                </div>
                <Button
                  onClick={() => onToggleFocus(goal.id)}
                  className="add-focus-btn"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DailyFocus;
