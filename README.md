# React Native Todo App

A robust Todo application built with React Native, following SOLID principles and MVVM architecture. This project demonstrates best practices in TypeScript, state management, and clean architecture.

## 🏗 Architecture

This project follows the MVVM (Model-View-ViewModel) architectural pattern and SOLID principles:

### Directory Structure

```
src/
├── adapters/
│   └── AsyncStorageAdapter.ts    # Storage implementation
├── interfaces/
│   ├── IStorage.ts              # Storage interface
│   ├── ITodo.ts                 # Todo model interface
│   └── ITodoRepository.ts       # Repository interface
├── repositories/
│   └── TodoRepository.ts        # Data persistence layer
├── services/
│   └── TodoService.ts           # Business logic layer
├── viewModels/
│   └── TodoViewModel.ts         # UI state management
└── views/
    ├── components/
    │   ├── TodoItem.tsx         # Todo item component
    │   └── TodoInput.tsx        # Input component
    └── TodoList.tsx             # Main list component
```

### SOLID Principles Implementation

1. **Single Responsibility Principle**
   - Each class has a single responsibility
   - Clear separation between data, business logic, and UI

2. **Open/Closed Principle**
   - Classes are open for extension but closed for modification
   - Interfaces allow for easy implementation of new features

3. **Liskov Substitution Principle**
   - All implementations can be substituted for their base interfaces
   - Strong typing ensures compatibility

4. **Interface Segregation Principle**
   - Specific interfaces for specific needs
   - No client depends on interfaces they don't use

5. **Dependency Inversion Principle**
   - High-level modules don't depend on low-level modules
   - Dependencies are injected through constructors

## 🚀 Features

- Create, Read, Update, and Delete todos
- Persistent storage using AsyncStorage
- Edit mode for todos
- Toggle todo completion status
- Clean and intuitive UI
- Type-safe implementation
- Error handling
- Loading states

## 🛠 Technologies

- React Native
- TypeScript
- MobX (State Management)
- AsyncStorage
- Jest (Testing)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-native-todo-app.git
```

2. Install dependencies:
```bash
cd react-native-todo-app
npm install
```

3. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## 💻 Usage

### Adding a Todo
```typescript
// Through the ViewModel
await todoViewModel.addTodo('New todo item');
```

### Editing a Todo
```typescript
// Through the ViewModel
await todoViewModel.editTodo(todoId, 'Updated todo text');
```

### Toggling a Todo
```typescript
// Through the ViewModel
await todoViewModel.toggleTodo(todoId);
```

### Deleting a Todo
```typescript
// Through the ViewModel
await todoViewModel.deleteTodo(todoId);
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🔄 Data Flow

1. User interacts with View
2. View calls ViewModel methods
3. ViewModel calls Service methods
4. Service processes business logic
5. Repository handles data persistence
6. Changes flow back up the chain
7. MobX updates the UI automatically

## 🛡 Error Handling

The application implements comprehensive error handling:
- Service layer catches and processes errors
- ViewModel maintains error state
- UI displays error messages when necessary

## 🎯 Best Practices

- Dependency Injection
- Interface-based programming
- Clean Architecture principles
- SOLID principles
- Type safety
- Error handling
- Code organization
- Component reusability

## 📝 License

MIT License - see LICENSE.md

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request