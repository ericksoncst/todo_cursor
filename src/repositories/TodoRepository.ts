import { ITodoRepository } from '../interfaces/ITodoRepository';
import { ITodo } from '../interfaces/ITodo';
import { IStorage } from '../interfaces/IStorage';

export class TodoRepository implements ITodoRepository {
  private readonly STORAGE_KEY = '@todos';
  private todos: ITodo[] = [];

  constructor(private storage: IStorage) {}

  private async persistTodos(): Promise<void> {
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  async getAll(): Promise<ITodo[]> {
    try {
      const storedTodos = await this.storage.getItem(this.STORAGE_KEY);
      this.todos = storedTodos ? JSON.parse(storedTodos) : [];
      return this.todos;
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  }

  async create(text: string): Promise<ITodo> {
    const todo: ITodo = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);
    await this.persistTodos();
    return todo;
  }

  async update(id: string, updates: Partial<Pick<ITodo, 'text' | 'completed'>>): Promise<ITodo> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) throw new Error('Todo not found');

    this.todos[index] = { ...this.todos[index], ...updates };
    await this.persistTodos();
    return this.todos[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) throw new Error('Todo not found');

    this.todos.splice(index, 1);
    await this.persistTodos();
  }
} 