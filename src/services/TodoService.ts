import { TodoRepository } from '../repositories/TodoRepository';
import { ITodo } from '../interfaces/ITodo';

export interface ITodoService {
    getTodos(): Promise<ITodo[]>;
    addTodo(text: string): Promise<ITodo>;
    toggleTodo(id: string): Promise<ITodo>;
    deleteTodo(id: string): Promise<void>;
    editTodo(id: string, newText: string): Promise<ITodo>;
  }

export class TodoService implements ITodoService {
  constructor(private repository: TodoRepository) {}

  async getTodos(): Promise<ITodo[]> {
    return await this.repository.getTodos();
  }

  async addTodo(text: string): Promise<ITodo> {
    console.log("ADDING TODO TODO SERVICE", text)

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

  async editTodo(id: string, newText: string): Promise<ITodo> {
    const todos = await this.repository.getTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');

    const updatedTodo = { ...todo, text: newText };
    return await this.repository.updateTodo(updatedTodo);
  }
}