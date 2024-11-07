/**
 * @format
 */

import React from 'react';
import { create } from 'react-test-renderer';
import App from '../App';

// Mock the TodoList component
jest.mock('../src/views/TodoList', () => ({
  TodoList: () => null
}));

// Mock TodoViewModel
jest.mock('../src/viewModels/TodoViewModel', () => ({
  TodoViewModel: jest.fn().mockImplementation(() => ({
    todos: [],
    isLoading: false,
    error: null,
    loadTodos: jest.fn()
  }))
}));

describe('App', () => {
  it('renders correctly', () => {
    const tree = create(<App />).toJSON();
    expect(tree).toBeTruthy();
  });
});
