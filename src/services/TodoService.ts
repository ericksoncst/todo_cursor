import { ITodoRepository } from '../repositories/TodoRepository';
import { ITodo } from '../interfaces/ITodo';

export interface ITodoService {
  getTodos(): Promise<ITodo[]>;
  addTodo(text: string): Promise<ITodo>;
  toggleTodo(id: string): Promise<ITodo>;
  deleteTodo(id: string): Promise<void>;
}

export class TodoService implements ITodoService {
  constructor(private repository: ITodoRepository) {}

  async getTodos(): Promise<ITodo[]> {
    return await this.repository.getTodos();
  }

  async addTodo(text: string): Promise<ITodo> {
    const newTodo: Omit<ITodo, 'id'> = {
      text,
      completed: false,
      createdAt: new Date()
    };
    return await this.repository.saveTodo(newTodo);
  }

  async toggleTodo(id: string): Promise<ITodo> {
    const todos = await this.repository.getTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    
    const updatedTodo = { ...todo, completed: !todo.completed };
    return await this.repository.updateTodo(updatedTodo);
  }

  async deleteTodo(id: string): Promise<void> {
    // Fix: Changed from delete to deleteTodo
    await this.repository.deleteTodo(id);
  }
}