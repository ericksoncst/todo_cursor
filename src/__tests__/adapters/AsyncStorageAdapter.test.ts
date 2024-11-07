import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageAdapter } from '../../adapters/AsyncStorageAdapter';

describe('AsyncStorageAdapter', () => {
  let storageAdapter: AsyncStorageAdapter;

  beforeEach(() => {
    storageAdapter = new AsyncStorageAdapter();
    jest.clearAllMocks();
  });

  it('should get item from AsyncStorage', async () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';
    AsyncStorage.getItem.mockResolvedValueOnce(value);

    // Act
    const result = await storageAdapter.getItem(key);

    // Assert
    expect(result).toBe(value);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should set item in AsyncStorage', async () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    await storageAdapter.setItem(key, value);

    // Assert
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should remove item from AsyncStorage', async () => {
    // Arrange
    const key = 'testKey';

    // Act
    await storageAdapter.removeItem(key);

    // Assert
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });
}); 