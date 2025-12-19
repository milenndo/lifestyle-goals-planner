import { useState } from 'react';
import { Button } from './UI';

interface Goal {
  title: string;
  description: string;
  category: string;
  target: number;
  progress: number;
  dueDate: string;
}

interface GoalFormProps {
  onAddGoal: (goal: Goal) => void;
}

const GoalForm = ({ onAddGoal }: GoalFormProps) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'health',
    target: 100,
    progress: 0,
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim()) {
      onAddGoal(form);
      setForm({
        title: '',
        description: '',
        category: 'health',
        target: 100,
        progress: 0,
        dueDate: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'target' || name === 'progress' ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label htmlFor="title">Goal Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g., Run a marathon"
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your goal"
          className="form-input"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="health">🏃 Health</option>
            <option value="fitness">💪 Fitness</option>
            <option value="career">💼 Career</option>
            <option value="learning">📚 Learning</option>
            <option value="finance">💰 Finance</option>
            <option value="personal">🎯 Personal</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="target">Target</label>
          <input
            id="target"
            type="number"
            name="target"
            value={form.target}
            onChange={handleChange}
            min="1"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="progress">Initial Progress</label>
          <input
            id="progress"
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            min="0"
            className="form-input"
          />
        </div>
      </div>

      <Button type="submit" className="submit-btn">
        ✅ Create Goal
      </Button>
    </form>
  );
};

export default GoalForm;
