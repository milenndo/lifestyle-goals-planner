import { Card } from './UI';

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

interface GoalProgressProps {
  goals: Goal[];
}

const GoalProgress = ({ goals }: GoalProgressProps) => {
  const calculateStats = () => {
    if (goals.length === 0) {
      return { totalProgress: 0, averageProgress: 0, completedGoals: 0 };
    }

    let totalProgress = 0;
    let completedGoals = 0;

    goals.forEach(goal => {
      const progress = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
      totalProgress += progress;
      if (progress >= 100) completedGoals++;
    });

    return {
      totalProgress: totalProgress,
      averageProgress: totalProgress / goals.length,
      completedGoals,
    };
  };

  const getCategoryStats = () => {
    const stats: Record<string, { count: number; completed: number; avgProgress: number }> = {};

    goals.forEach(goal => {
      if (!stats[goal.category]) {
        stats[goal.category] = { count: 0, completed: 0, avgProgress: 0 };
      }
      stats[goal.category].count++;
      const progress = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
      stats[goal.category].avgProgress += progress;
      if (progress >= 100) stats[goal.category].completed++;
    });

    Object.keys(stats).forEach(category => {
      stats[category].avgProgress = stats[category].avgProgress / stats[category].count;
    });

    return stats;
  };

  const stats = calculateStats();
  const categoryStats = getCategoryStats();
  const categoryEmojis: Record<string, string> = {
    health: '🏃',
    fitness: '💪',
    career: '💼',
    learning: '📚',
    finance: '💰',
    personal: '🎯',
  };

  return (
    <div className="progress-container">
      <Card className="overview-card">
        <h2>📊 Overall Progress</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <h3>{goals.length}</h3>
            <p>Total Goals</p>
          </div>
          <div className="stat-box">
            <h3>{stats.completedGoals}</h3>
            <p>Completed</p>
          </div>
          <div className="stat-box">
            <h3>{Math.round(stats.averageProgress)}%</h3>
            <p>Avg Progress</p>
          </div>
          <div className="stat-box">
            <h3>{goals.length - stats.completedGoals}</h3>
            <p>In Progress</p>
          </div>
        </div>

        {goals.length > 0 && (
          <div className="overall-progress">
            <div className="progress-bar-large">
              <div
                className="progress-fill-large"
                style={{ width: `${stats.averageProgress}%` }}
              />
            </div>
            <span className="progress-label">{Math.round(stats.averageProgress)}% Overall Progress</span>
          </div>
        )}
      </Card>

      <Card className="category-stats-card">
        <h2>📁 Progress by Category</h2>
        {Object.keys(categoryStats).length === 0 ? (
          <p>No categories yet. Create some goals to see statistics.</p>
        ) : (
          <div className="category-list">
            {Object.entries(categoryStats).map(([category, data]) => (
              <div key={category} className="category-item">
                <div className="category-info">
                  <span className="category-emoji">{categoryEmojis[category] || '📌'}</span>
                  <div className="category-details">
                    <h4>{category}</h4>
                    <p>{data.completed} of {data.count} completed</p>
                  </div>
                </div>
                <div className="category-progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${data.avgProgress}%` }}
                  />
                </div>
                <span className="percentage">{Math.round(data.avgProgress)}%</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="recent-updates-card">
        <h2>🌟 Recent Updates</h2>
        {goals.length === 0 ? (
          <p>No goals yet. Start creating goals to track your progress!</p>
        ) : (
          <div className="recent-list">
            {goals.slice(0, 5).reverse().map(goal => {
              const progress = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
              return (
                <div key={goal.id} className="recent-item">
                  <div className="recent-info">
                    <h4>{goal.title}</h4>
                    <span className="recent-date">📅 {new Date(goal.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="recent-progress">
                    <span className="progress-value">{goal.progress}/{goal.target}</span>
                    <span className={`status ${progress >= 100 ? 'completed' : ''}`}>
                      {progress >= 100 ? '✅ Done' : '🕨 ⭐ ' + Math.round(progress) + '%'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default GoalProgress;
