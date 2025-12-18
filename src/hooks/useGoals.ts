// Custom hook for managing lifestyle goals
import { useState, useCallback } from 'react';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = useCallback((goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, newGoal]);
  }, []);

  const removeGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setGoals(prev =>
      prev.map(goal => (goal.id === id ? { ...goal, ...updates } : goal))
    );
  }, []);

  return {
    goals,
    addGoal,
    removeGoal,
    updateGoal,
  };
};
