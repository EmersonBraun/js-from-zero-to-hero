import { describe, it, expect } from "vitest";

function createTodo(text) {
  return {
    id: Date.now(),
    text,
    completed: false,
  };
}

function toggleTodo(todo) {
  return { ...todo, completed: !todo.completed };
}

function filterTodos(todos, filter) {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

function getStats(todos) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  return { total, completed, active };
}

describe("createTodo", () => {
  it("creates a todo with text and completed=false", () => {
    const todo = createTodo("Buy groceries");
    expect(todo.text).toBe("Buy groceries");
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeDefined();
  });
});

describe("toggleTodo", () => {
  it("toggles completed state", () => {
    const todo = createTodo("Test");
    const toggled = toggleTodo(todo);
    expect(toggled.completed).toBe(true);

    const toggledBack = toggleTodo(toggled);
    expect(toggledBack.completed).toBe(false);
  });

  it("does not mutate original", () => {
    const todo = createTodo("Test");
    toggleTodo(todo);
    expect(todo.completed).toBe(false);
  });
});

describe("filterTodos", () => {
  const todos = [
    { id: 1, text: "A", completed: false },
    { id: 2, text: "B", completed: true },
    { id: 3, text: "C", completed: false },
  ];

  it("returns all todos with 'all' filter", () => {
    expect(filterTodos(todos, "all")).toHaveLength(3);
  });

  it("returns only active todos", () => {
    const active = filterTodos(todos, "active");
    expect(active).toHaveLength(2);
    expect(active.every((t) => !t.completed)).toBe(true);
  });

  it("returns only completed todos", () => {
    const completed = filterTodos(todos, "completed");
    expect(completed).toHaveLength(1);
    expect(completed[0].text).toBe("B");
  });
});

describe("getStats", () => {
  it("calculates stats correctly", () => {
    const todos = [
      { id: 1, text: "A", completed: false },
      { id: 2, text: "B", completed: true },
      { id: 3, text: "C", completed: true },
    ];
    const stats = getStats(todos);
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(2);
    expect(stats.active).toBe(1);
  });

  it("handles empty list", () => {
    const stats = getStats([]);
    expect(stats.total).toBe(0);
    expect(stats.completed).toBe(0);
    expect(stats.active).toBe(0);
  });
});
