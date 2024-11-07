import { TodoService } from '../../services/TodoService';
import { ITodoRepository } from '../../repositories/TodoRepository';
import { ITodo } from '../../interfaces/ITodo';

describe('TodoService', () => {
  let service: TodoService;
  let mockRepository: jest.Mocked<ITodoRepository>;
  const mockDate = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(() => {
    mockRepository = {
      getTodos: jest.fn(),
      saveTodo: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),  // Updated method name
    };

    service = new TodoService(mockRepository);
  });

  // ... other tests ...

  describe('deleteTodo', () => {
    it('should delete todo from repository', async () => {
      const todoId = '1';
      mockRepository.deleteTodo.mockResolvedValueOnce();

      await service.deleteTodo(todoId);

      expect(mockRepository.deleteTodo).toHaveBeenCalledWith(todoId);
    });

    it('should throw error when delete fails', async () => {
      const error = new Error('Delete failed');
      mockRepository.deleteTodo.mockRejectedValueOnce(error);

      await expect(service.deleteTodo('1')).rejects.toThrow('Delete failed');
    });
  });
});