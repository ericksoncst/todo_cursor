import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { TodoViewModel } from '../viewModels/TodoViewModel';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';

interface TodoListProps {
  viewModel: TodoViewModel;
}

export const TodoList = observer(({ viewModel }: TodoListProps) => {
  const handleAddTodo = async (text: string) => {
    console.log('Adding todo:', text); // Debug log
    await viewModel.addTodo(text);
    console.log('Current todos:', viewModel.todos); // Debug log
  };

  if (viewModel.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (viewModel.error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{viewModel.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TodoInput onSubmit={handleAddTodo} />
      <FlatList
        data={viewModel.todos.slice()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={(id) => viewModel.toggleTodo(id)}
            onDelete={(id) => viewModel.deleteTodo(id)}
            onEdit={(id, newText) => viewModel.editTodo(id, newText)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginHorizontal: 20,
  },
}); 