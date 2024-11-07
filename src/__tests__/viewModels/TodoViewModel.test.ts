import { TodoViewModel } from '../../viewModels/TodoViewModel';
import { ITodoService } from '../../services/TodoService';
import { ITodo } from '../../interfaces/ITodo';

describe('TodoViewModel', () => {
  let viewModel: TodoViewModel;
  let mockService: jest.Mocked<ITodoService>;
  const mockDate = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(() => {
    mockService = {
      getTodos: jest.fn(),
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };

    viewModel = new TodoViewModel(mockService);
  });

  it('should toggle todo completion status', async () => {
    // Arrange
    const todo: ITodo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: mockDate,
    };
    viewModel.todos = [todo];
    const toggledTodo = { ...todo, completed: true };
    mockService.toggleTodo.mockResolvedValueOnce(toggledTodo);

    // Act
    await viewModel.toggleTodo('1');

    // Assert
    expect(mockService.toggleTodo).toHaveBeenCalledWith('1');
    expect(viewModel.todos[0].completed).toBe(true);
  });

  it('should handle error when toggling todo fails', async () => {
    // Arrange
    const errorMessage = 'Failed to toggle todo';
    mockService.toggleTodo.mockRejectedValueOnce(new Error(errorMessage));

    // Act
    await viewModel.toggleTodo('1');

    // Assert
    expect(viewModel.error).toBe(errorMessage);
  });
});