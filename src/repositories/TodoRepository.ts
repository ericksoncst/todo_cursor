// src/repositories/TodoRepository.ts
import { ITodo } from '../interfaces/ITodo';
import { AsyncStorageAdapter } from '../adapters/AsyncStorageAdapter';

export class TodoRepository {
  private todos: ITodo[] = [];
  private readonly STORAGE_KEY = 'todos'; // Ensure this is the correct key

  constructor(private storage: AsyncStorageAdapter) {}

  async getTodos(): Promise<ITodo[]> {
    const todosJson = await this.storage.getItem(this.STORAGE_KEY);
    this.todos = todosJson ? JSON.parse(todosJson) : [];
    return this.todos;
  }

  async saveTodo(todo: Omit<ITodo, 'id'>): Promise<ITodo> {
    const newTodo: ITodo = { ...todo, id: this.generateId() };
    this.todos.push(newTodo);
    await this.persistTodos();
    return newTodo;
  }

  async updateTodo(updatedTodo: ITodo): Promise<ITodo> {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index === -1) throw new Error('Todo not found');

    this.todos[index] = updatedTodo;
    await this.persistTodos();
    return updatedTodo;
  }

  async deleteTodo(id: string): Promise<void> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) throw new Error('Todo not found');

    this.todos.splice(index, 1);
    await this.persistTodos();
  }

  private async persistTodos(): Promise<void> {
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}