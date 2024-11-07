/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { TodoList } from './src/views/TodoList';
import { TodoViewModel } from './src/viewModels/TodoViewModel';
import { AsyncStorageAdapter } from './src/adapters/AsyncStorageAdapter';
import { TodoRepository } from './src/repositories/TodoRepository';
import { TodoService } from './src/services/TodoService';

const App: React.FC = observer(() => {

  const storageAdapter = new AsyncStorageAdapter();
   const todoRepository = new TodoRepository(storageAdapter);
  const todoService = new TodoService(todoRepository);
  const todoViewModel = new TodoViewModel(todoService);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TodoList viewModel={todoViewModel} />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
