import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }
}));

// Mock React Native
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn(x => x.ios)
  },
  StyleSheet: {
    create: (styles: any) => styles
  },
  View: 'View',
  Text: 'Text',
  SafeAreaView: 'SafeAreaView',
  StatusBar: 'StatusBar'
}));

// Mock mobx-react-lite
jest.mock('mobx-react-lite', () => ({
  observer: (component: any) => component
})); 