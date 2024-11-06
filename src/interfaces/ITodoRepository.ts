import { ITodo } from './ITodo';

export interface ITodoRepository {
  getAll(): Promise<ITodo[]>;
  create(text: string): Promise<ITodo>;
  update(id: string, updates: Partial<Pick<ITodo, 'text' | 'completed'>>): Promise<ITodo>;
  delete(id: string): Promise<void>;
} 