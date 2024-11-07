// src/__tests__/repositories/TodoRepository.test.ts
import { TodoRepository } from '../../repositories/TodoRepository';
import { AsyncStorageAdapter } from '../../adapters/AsyncStorageAdapter';
import { ITodo } from '../../interfaces/ITodo';

describe('TodoRepository', () => {
  let repository: TodoRepository;
  let mockStorage: jest.Mocked<AsyncStorageAdapter>;
  const mockDate = new Date('2024-01-01T00:00:00.000Z');
  const STORAGE_KEY = 'todos'; // Ensure this matches the repository

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    } as jest.Mocked<AsyncStorageAdapter>;

    repository = new TodoRepository(mockStorage);
  });

  describe('deleteTodo', () => {
    it('should delete existing todo', async () => {
      // Arrange
      const existingTodos: ITodo[] = [{
        id: '1',
        text: 'Test todo',
        completed: false,
        createdAt: mockDate
      }];
      mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingTodos));
      mockStorage.setItem.mockResolvedValueOnce();

      // Act
      await repository.getTodos(); // Ensure todos are loaded
      await repository.deleteTodo('1');

      // Assert
      expect(mockStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, '[]');
    });

    it('should throw error when todo not found', async () => {
      // Arrange
      mockStorage.getItem.mockResolvedValueOnce('[]');

      // Act & Assert
      await expect(repository.deleteTodo('non-existent'))
        .rejects.toThrow('Todo not found');
    });
  });
});