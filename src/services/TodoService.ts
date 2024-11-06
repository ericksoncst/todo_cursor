import { ITodoRepository } from '../interfaces/ITodoRepository';
import { ITodo } from '../interfaces/ITodo';

export interface ITodoService {
  getTodos(): Promise<ITodo[]>;
  addTodo(text: string): Promise<ITodo>;
  toggleTodo(id: string): Promise<ITodo>;
  editTodo(id: string, text: string): Promise<ITodo>;
  deleteTodo(id: string): Promise<void>;
}

export class TodoService implements ITodoService {
  constructor(private repository: ITodoRepository) {}

  async getTodos(): Promise<ITodo[]> {
    return await this.repository.getAll();
  }

  async addTodo(text: string): Promise<ITodo> {
    return await this.repository.create(text);
  }

  async toggleTodo(id: string): Promise<ITodo> {
    const todos = await this.repository.getAll();
    const todo = todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');

    return await this.repository.update(id, {
      completed: !todo.completed,
    });
  }

  async editTodo(id: string, text: string): Promise<ITodo> {
    return await this.repository.update(id, { text });
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}