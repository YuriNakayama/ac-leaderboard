# Coding Guidelines

## General Principles

- Follow DRY (Don't Repeat Yourself) principle
- Follow SOLID principles
- Follow the Single Responsibility Principle
- Prioritize early returns over complex conditions
- Minimize side effects and prioritize pure functions
- Prioritize functions and Composition API over classes

## TypeScript Conventions

- Use explicit type definitions for all functions and variables
- Avoid using any type; use unknown when necessary
- Prefer type aliases (type) over interfaces
- Use runtime type validation with Zod
- Add explanatory comments for complex types
- Avoid using index signatures

## React Component Conventions

- Components should follow Atomic Design principles
- Avoid using React.FC (leverage TypeScript's type inference)
- Define Props types immediately before each component
- Use ES6 default parameters for default Props values
- Use PascalCase for component file names
- Separate logic and UI, extract into custom hooks

## State Management

- Use `useState` for local state
- Use `useReducer` for complex state
- Use Context API for global state
- Use Tanstack Query or SWR for server state
- Maintain immutability when updating state
- Use memoization appropriately for state management optimization

## API Communication

- Consolidate API functions in `/lib/api`
- Handle errors with consistent patterns
- Use SWR or React Query for data fetching
- Handle access tokens with care
- Make API calls type-safe
- Always validate responses
