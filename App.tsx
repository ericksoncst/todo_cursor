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

const App: React.FC = observer(() => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TodoList viewModel={new TodoViewModel(/* dependencies */)} />
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
