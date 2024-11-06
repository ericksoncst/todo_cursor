import { TodoViewModel } from '../viewModels/TodoViewModel';
import { TodoService } from '../services/TodoService';

describe('TodoViewModel', () => {
  let todoService: TodoService;
  let viewModel: TodoViewModel;

  beforeEach(() => {
    todoService = new TodoService();
    viewModel = new TodoViewModel(todoService);
  });

  it('should add a new todo', async () => {
    await viewModel.addTodo('Test todo');
    expect(viewModel.todos.length).toBe(1);
    expect(viewModel.todos[0].text).toBe('Test todo');
    expect(viewModel.todos[0].completed).toBe(false);
  });

  it('should toggle todo completion', async () => {
    await viewModel.addTodo('Test todo');
    const todoId = viewModel.todos[0].id;
    
    await viewModel.toggleTodo(todoId);
    expect(viewModel.todos[0].completed).toBe(true);
    
    await viewModel.toggleTodo(todoId);
    expect(viewModel.todos[0].completed).toBe(false);
  });

  it('should delete a todo', async () => {
    await viewModel.addTodo('Test todo');
    const todoId = viewModel.todos[0].id;
    
    await viewModel.deleteTodo(todoId);
    expect(viewModel.todos.length).toBe(0);
  });
}); 