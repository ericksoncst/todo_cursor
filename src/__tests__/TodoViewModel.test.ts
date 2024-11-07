import { TodoViewModel } from '../viewModels/TodoViewModel';
import { ITodoService } from '../services/TodoService';
import { ITodo } from '../interfaces/ITodo';
import { configure } from 'mobx';

// Configure MobX to allow state modifications in tests
configure({
  enforceActions: 'never'
});

describe('TodoViewModel', () => {
  let viewModel: TodoViewModel;
  let mockService: jest.Mocked<ITodoService>;
  const mockDate = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    mockService = {
      getTodos: jest.fn(),
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    
    viewModel = new TodoViewModel(mockService);
  });

  it('should add a new todo successfully', async () => {
    // Arrange
    const newTodoText = 'Test todo';
    const mockTodo: ITodo = {
      id: '1',
      text: newTodoText,
      completed: false,
      createdAt: mockDate
    };
    mockService.addTodo.mockResolvedValueOnce(mockTodo);

    // Act
    await viewModel.addTodo(newTodoText);

    // Assert
    expect(mockService.addTodo).toHaveBeenCalledWith(newTodoText);
    expect(viewModel.todos).toHaveLength(1);
    expect(viewModel.todos[0]).toEqual(mockTodo);
    expect(viewModel.error).toBeNull();
  });

  it('should handle error when adding todo fails', async () => {
    // Arrange
    const errorMessage = 'Failed to add todo';
    mockService.addTodo.mockRejectedValueOnce(new Error(errorMessage));

    // Act
    await viewModel.addTodo('Test todo');

    // Assert
    expect(viewModel.todos).toHaveLength(0);
    expect(viewModel.error).toBe(errorMessage);
  });
}); 