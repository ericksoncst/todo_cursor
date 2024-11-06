import { makeAutoObservable, runInAction } from 'mobx';
import { ITodoService } from '../services/TodoService';
import { ITodo } from '../interfaces/ITodo';

export class TodoViewModel {
  todos: ITodo[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private todoService: ITodoService) {
    makeAutoObservable(this);
  }

  async loadTodos() {
    try {
      this.isLoading = true;
      const loadedTodos = await this.todoService.getTodos();
      runInAction(() => {
        this.todos = loadedTodos;
        this.error = null;
      });
    } catch (error) {
      this.handleError(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async addTodo(text: string) {
    try {
      const newTodo = await this.todoService.addTodo(text);
      runInAction(() => {
        this.todos.push(newTodo);
        this.error = null;
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async toggleTodo(id: string) {
    try {
      const updated = await this.todoService.toggleTodo(id);
      runInAction(() => {
        const index = this.todos.findIndex(t => t.id === id);
        this.todos[index] = updated;
        this.error = null;
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async editTodo(id: string, text: string) {
    try {
      const updated = await this.todoService.editTodo(id, text);
      runInAction(() => {
        const index = this.todos.findIndex(t => t.id === id);
        this.todos[index] = updated;
        this.error = null;
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.todoService.deleteTodo(id);
      runInAction(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.error = null;
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    runInAction(() => {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    });
  }
} 