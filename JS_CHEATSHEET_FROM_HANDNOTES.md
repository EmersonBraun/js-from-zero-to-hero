# JavaScript Interview Cheatsheet (From Handnotes)

---

## 1. Execution Context & Call Stack

### Execution Context
An execution context is a space in which code is executed. It contains:
- **Thread of execution** — runs through code line by line
- **Memory** — a place to store data (variables, functions)

When a function is called, it creates a **new execution context** with its own thread and local memory. When the function finishes, that execution context (and its local memory) is destroyed.

### Global Execution Context
The main execution context created as soon as a JS file starts running. It contains the thread of execution and memory for the overall file. It's always at the bottom of the call stack.

### Call Stack
JS keeps track of what function is currently running:
- **Run a function** → push it onto the call stack
- **Finish running** → pop it off the call stack
- **Top of the stack** = the function currently executing
- The **global execution context** is always at the bottom

```
|  inner()     |  ← currently executing
|  outer()     |
|  global()    |
└──────────────┘
```

### Function Exit
The `return` keyword signals JS to:
1. Exit the current function's execution context
2. Pass the return value back to the calling context
3. Resume execution from wherever the function was called

### Parameter vs Argument
- **Parameter** → the label/identifier declared in the function signature (the name)
- **Argument** → the actual value passed when calling the function

```js
function greet(name) {   // 'name' is the parameter
  console.log(name);
}
greet("Victor");          // "Victor" is the argument
```

---

## 2. Primitive Types

JS has 7 primitive types:

| Type | Example | Notes |
|---|---|---|
| `number` | `42`, `3.14` | 64-bit float (no separate int type) |
| `string` | `"hello"` | Immutable sequence of characters |
| `boolean` | `true`, `false` | |
| `bigint` | `9007199254740993n` | Arbitrary precision integers (ES2020) |
| `undefined` | `undefined` | Variable declared but not assigned |
| `null` | `null` | Intentional absence of value |
| `symbol` | `Symbol("id")` | Unique identifier (ES2015) |

**Key distinction**: primitives are stored by **value** (on the stack), objects are stored by **reference** (on the heap).

---

## 3. var, let, and const

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function-scoped | Block-scoped `{}` | Block-scoped `{}` |
| Hoisting | Hoisted + initialized as `undefined` | Hoisted but NOT initialized (TDZ) | Hoisted but NOT initialized (TDZ) |
| Reassignment | Yes | Yes | No |
| Redeclaration | Yes | No (same scope) | No (same scope) |
| Status | Legacy — avoid | Use when reassignment needed | Default choice |

**Temporal Dead Zone (TDZ)**: The period between entering a scope and the variable's declaration. Accessing a `let`/`const` variable during the TDZ throws a `ReferenceError`.

```js
console.log(a); // undefined (var is hoisted + initialized)
console.log(b); // ReferenceError (TDZ!)
var a = 1;
let b = 2;
```

**`const` does NOT mean immutable** — it prevents reassignment of the binding, not mutation of the value:

```js
const user = { name: "Victor" };
user.name = "David";    // ✅ Mutating the object is allowed
user = { name: "Rui" }; // ❌ TypeError — reassigning the binding
```

---

## 4. Functions: Callbacks & Higher-Order Functions

### First-Class Objects
Functions in JS are **first-class objects** — they are treated like any other value with no restrictions. They can be:
- Assigned to variables
- Passed as arguments to other functions
- Returned from functions
- Stored in data structures (arrays, objects)

### Higher-Order Functions
A function that does at least one of:
1. **Takes one or more functions as arguments**
2. **Returns a function as its result**

```js
function copyArrayAndManipulate(array, instructions) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

const result = copyArrayAndManipulate([1, 2, 3], (num) => num * 2);
// result: [2, 4, 6]
```

### Callbacks
The function passed as an argument to a higher-order function. In the example above, `(num) => num * 2` is the callback.

**Why callbacks matter:**
- Keep code **DRY** — write the iteration logic once, change behavior via callbacks
- Enable **declarative code** — `map`, `filter`, `reduce` are the most readable way to work with data
- **Core of async JS** — under the hood of promises, async/await

### Anonymous Functions
A function passed or used without being given a name:

```js
// Anonymous function as callback
[1, 2, 3].map(function(x) { return x * 2; });

// Anonymous arrow function
[1, 2, 3].map(x => x * 2);
```

### Imperative vs Declarative Code
- **Imperative** — describes step-by-step HOW to do something (loops, push, manual iteration)
- **Declarative** — describes WHAT you want to happen in a readable way (`map`, `filter`, `reduce`)

Under the hood of any declarative code, there must be imperative code showing how to actually do it.

```js
// Imperative
const doubled = [];
for (let i = 0; i < nums.length; i++) {
  doubled.push(nums[i] * 2);
}

// Declarative
const doubled = nums.map(n => n * 2);
```

---

## 5. `this` Keyword

### Regular Functions vs Arrow Functions
- **Regular functions** define their own `this` binding based on **how they are called** (4 rules below)
- **Arrow functions** do NOT have their own `this` — they **inherit lexically** from the surrounding scope where they are defined

### The 4 Rules of `this` (in order of precedence)
1. **`new` binding**: `new Foo()` → `this` is the newly created object
2. **Explicit binding**: `foo.call(obj)`, `foo.apply(obj)`, `foo.bind(obj)` → `this` is `obj`
3. **Implicit binding**: `obj.foo()` → `this` is `obj` (object to the left of the dot)
4. **Default binding**: plain `foo()` → `this` is `undefined` in strict mode, `window` in sloppy mode

### Implicit Parameter
When a function is called as a method on an object (e.g., `user.increment()`), `this` is the **implicit parameter** automatically set to the object to the left of the dot.

### Nested Functions Problem
When a regular function is defined and called **inside** a method, `this` in the inner function refers to the global object (not the parent object):

```js
const user = {
  score: 0,
  increment: function() {
    function add1() {
      this.score++;  // ❌ 'this' is window/undefined, NOT user!
    }
    add1();
  }
};
```

### Arrow Functions Fix This
```js
const user = {
  score: 0,
  increment: function() {
    const add1 = () => {
      this.score++;  // ✅ 'this' is user (inherited from increment's scope)
    };
    add1();
  }
};
```

### Pre-Arrow-Function Workaround
Before arrow functions, developers used `that = this`:

```js
increment: function() {
  const that = this;
  function add1() {
    that.score++;  // Uses the captured reference
  }
  add1();
}
```

---

## 6. Closures (In-Depth)

### What Is a Closure?

A **closure** is created when a function is defined inside another function and the inner function **retains access** to the outer function's variables — even after the outer function has finished executing and its execution context has been destroyed.

### Step-by-Step: How Closures Work

```js
function outer() {
  let counter = 0;           // Local variable in outer's execution context

  function inner() {
    counter++;               // Accesses outer's variable
    console.log(counter);
  }

  return inner;              // Returns the function definition
}

const myFunc = outer();      // outer() runs and returns inner
// At this point, outer's execution context is GONE from the call stack
// But counter is NOT garbage collected!

myFunc(); // 1  — counter persists!
myFunc(); // 2  — same counter, incremented again
myFunc(); // 3
```

**What happens here:**
1. `outer()` creates a new execution context with `counter = 0` and `inner` function
2. `inner` is returned and stored in `myFunc`
3. `outer`'s execution context is popped off the call stack and destroyed
4. BUT — `inner` was defined inside `outer`, so it carries a **hidden bond** to `outer`'s variables
5. Every time `myFunc()` is called, it can still access `counter` through this hidden bond
6. `counter` is **persistent** and **private** — only `inner` can access it

### The "Backpack" Mental Model

When a function is returned from another function, it carries a **backpack** (closure) of data from the parent scope:

```
myFunc = [function inner] + 🎒 { counter: 0 }
```

The backpack contains ONLY the variables that the inner function actually references (not the entire parent scope).

### The Hidden `[[scope]]` Property

Every function in JS has a hidden property called `[[scope]]` that stores a reference to the scope in which the function was defined. This is what creates the "backpack":

- `[[scope]]` → link to the variables from the parent execution context
- You cannot access `[[scope]]` directly in code — it's an internal engine property
- **Scope** = what data is available at any given line of code

### Formal Names for the "Backpack"
- **C.O.V.E.** — Closed Over Variable Environment
- **P.L.S.R.D.** — Persistent Lexical Scope Referenced Data
- Most commonly just called **"closure"**

### Lexical Scoping vs Dynamic Scoping

**Lexical scoping** (what JS uses): a function has access to data based on **where it was defined** in the code.

**Dynamic scoping** (what JS does NOT use): a function would have access to data based on **where it was called from**.

```js
const nome = "Global";

function exibirNome() {
  console.log(nome);  // Always looks at where it was WRITTEN (global scope)
}

function escopoPai() {
  const nome = "Local do pai";
  exibirNome();  // Calls the function here
}

escopoPai();
// Result: "Global" (lexical scoping — defined in global scope)
// If JS used dynamic scoping, it would print "Local do pai"
```

### Variable Lookup Order (Scope Chain)

When JS encounters a variable inside a function, it searches in this order:
1. **Local memory** (the function's own variables)
2. **Closure / backpack** (variables from parent scope via `[[scope]]`)
3. **Global scope**

If not found in any of these → `ReferenceError`.

### Independent Closures

Each call to an outer function creates a **new, independent closure**:

```js
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counterA = createCounter();  // counterA has its own 🎒 { count: 0 }
const counterB = createCounter();  // counterB has its own 🎒 { count: 0 }

counterA(); // 1
counterA(); // 2
counterB(); // 1  ← independent! Not affected by counterA
counterA(); // 3
counterB(); // 2
```

### Practical Examples of Closures

#### Example 1: Data Privacy / Encapsulation

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // Private — cannot be accessed from outside

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);      // 150
account.withdraw(30);     // 120
account.getBalance();     // 120
// account.balance         → undefined (private!)
```

#### Example 2: How `Array.prototype.map` Uses Closures

When you pass a callback to `.map()`, the callback closes over variables from the surrounding scope:

```js
function multiplyAll(array, multiplier) {
  // The callback below closes over 'multiplier' from this scope
  return array.map(function(element) {
    return element * multiplier;  // 'multiplier' comes from the closure!
  });
}

multiplyAll([1, 2, 3], 5);  // [5, 10, 15]
```

Under the hood, `.map()` is essentially doing this:
```js
Array.prototype.map = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
    // When callback executes, it still has access to 'multiplier'
    // through its closure, even though we're now inside .map()'s
    // execution context
  }
  return result;
};
```

#### Example 3: Function Factories

```js
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");   // 🎒 { greeting: "Hello" }
const sayOla = createGreeter("Olá");       // 🎒 { greeting: "Olá" }

sayHello("Victor");  // "Hello, Victor!"
sayOla("Victor");    // "Olá, Victor!"
```

#### Example 4: Debounce (Real-World Closure)

```js
function debounce(fn, delay) {
  let timeoutId;  // Persists across calls via closure

  return function(...args) {
    clearTimeout(timeoutId);  // Cancel previous timer
    timeoutId = setTimeout(() => fn(...args), delay);  // Set new timer
    // 'timeoutId' is in the closure — it persists between calls
  };
}

const search = debounce((query) => console.log("Searching:", query), 300);
search("h");       // timer set
search("he");      // previous cancelled, new timer
search("hello");   // previous cancelled, new timer — only this one fires
```

#### Example 5: Iterators Using Closures

```js
function createIterator(array) {
  let index = 0;  // Private state via closure

  return {
    next() {
      if (index < array.length) {
        return { value: array[index++], done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

const it = createIterator([10, 20, 30]);
it.next(); // { value: 10, done: false }
it.next(); // { value: 20, done: false }
it.next(); // { value: 30, done: false }
it.next(); // { value: undefined, done: true }
```

#### Example 6: The Classic Loop Trap (Interview Favorite)

```js
// ❌ BUG: All callbacks log 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 — because 'var' is function-scoped, all closures share the same 'i'

// ✅ FIX 1: Use 'let' (block-scoped — each iteration gets its own 'i')
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// ✅ FIX 2: Use an IIFE to create a new closure per iteration
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Output: 0, 1, 2
```

### Why Closures Matter — Summary

| Use Case | How Closure Helps |
|---|---|
| **Data privacy** | Variables in the backpack are inaccessible from outside |
| **State persistence** | Data survives after the outer function returns |
| **Function factories** | Generate specialized functions with pre-configured behavior |
| **Callbacks & event handlers** | Retain access to context when executed later |
| **Module pattern** | Expose public API while hiding internals |
| **Memoization** | Cache results in the closure for expensive computations |
| **Iterators** | Track position via private state |

---

## 7. Type Coercion

### Operator-Specific Coercion Rules

| Operator | Behavior | Example | Result |
|---|---|---|---|
| `+` (with a string) | **String concatenation** (NO number coercion) | `"3" + 7` | `"37"` |
| `*` | toNumber coercion | `"3" * 7` | `21` |
| `-` | toNumber coercion | `"3" - 1` | `2` |
| `/` | toNumber coercion | `"6" / 2` | `3` |
| `%` | toNumber coercion | `"7" % 2` | `1` |
| `**` | toNumber coercion | `"2" ** 3` | `8` |
| `<`, `>`, `<=`, `>=` | toNumber coercion | `"3" < 10` | `true` |

**Key rule**: All arithmetic/relational operators perform toNumber coercion EXCEPT `+` when one operand is a string (then it concatenates).

### Boolean Coercion (Falsy Values)

When a value is used in a conditional (`if`, `while`, ternary), JS coerces it to boolean.

**Falsy values** (coerce to `false`):
| Value | Type |
|---|---|
| `false` | boolean |
| `0`, `-0`, `0n` | number/bigint |
| `""` (empty string) | string |
| `null` | null |
| `undefined` | undefined |
| `NaN` | number |

**Everything else is truthy** — including `"0"`, `" "`, `[]`, `{}`, `function(){}`.

### `==` vs `===`

| Operator | Coercion | Example |
|---|---|---|
| `==` (loose) | Performs type coercion before comparison | `0 == ""` → `true` |
| `===` (strict) | No coercion — checks value AND type | `0 === ""` → `false` |

**Why it matters** — the donation field example:
```js
const donationField = "";  // User hasn't filled in the field
const zeroDonation = 0;    // User explicitly chose $0

// With ==, these are indistinguishable:
"" == 0;   // true (coercion makes them equal)

// With ===, you can tell them apart:
"" === 0;  // false
```

**Additional gap to note: `Object.is()`**
- Almost identical to `===`, but handles two edge cases differently:
  - `Object.is(NaN, NaN)` → `true` (while `NaN === NaN` → `false`)
  - `Object.is(+0, -0)` → `false` (while `+0 === -0` → `true`)
- React uses `Object.is` internally to compare state values in `useState`

---

## 8. Memory: Stack vs Heap

### Stack Memory
- Stores **primitive values** (number, string, boolean, undefined, null, symbol, bigint)
- Stores **execution context** frames (tracks which function is running)
- Stores **references** (memory addresses / pointers) that point to objects in the heap
- Fixed size, fast access (LIFO)

### Heap Memory
- Stores **complex objects**: Objects, Arrays, Functions, Closures
- Dynamic size, slower access
- Managed by garbage collector

### Reference Equality

Objects are compared by **reference** (memory address), NOT by content:

```js
const a = { name: "Victor" };
const b = { name: "Victor" };

a === b;  // false — different objects in heap, different references
a == b;   // false — same reason

const c = a;  // c now points to the SAME object as a
a === c;  // true — same reference
c.name = "Changed";
console.log(a.name);  // "Changed" — same object!
```

### Copying References
When you assign one object variable to another, you copy the **reference (pointer)**, NOT the contents. Both variables point to the same location in memory.

```
Stack                  Heap
┌──────────┐          ┌──────────────────┐
│ a: 0x001 │────────→ │ { name: "Victor"}│
│ c: 0x001 │────────→ │                  │
└──────────┘          └──────────────────┘
```

---

## 9. Symbols & Metaprogramming

### Symbol
A unique, immutable primitive used mainly as property keys:

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
id1 === id2;  // false — every Symbol is unique
```

**Purpose**: Create semi-hidden, collision-proof properties. Symbols don't appear in `for...in`, `Object.keys()`, or `JSON.stringify()`.

### Use Cases

**1. "Private" properties:**
```js
const INTERNAL_KEY = Symbol("password");

class User {
  constructor(name, password) {
    this.name = name;
    this[INTERNAL_KEY] = password;  // Won't appear in listings
  }
}
```

**2. Avoiding name collisions (unique keys for libraries):**
```js
const LIB_ID = Symbol("unique_id");

function initialize(obj) {
  obj[LIB_ID] = Math.random();  // Won't conflict with user's properties
}
```

**3. Well-Known Symbols (built-in hooks):**
- `Symbol.toPrimitive` — customize object-to-primitive coercion
- `Symbol.iterator` — make an object iterable (`for...of`)
- `Symbol.hasInstance` — customize `instanceof`
- `Symbol.toStringTag` — customize `Object.prototype.toString()`

### `Symbol.toPrimitive` (@@toPrimitive)

A hidden property defining how an object should be coerced to a primitive:

```js
const user = { name: "Victor", score: 42 };

user[Symbol.toPrimitive] = function(hint) {
  if (hint === "number") return this.score;
  if (hint === "string") return this.name;
  return this.score;  // default
};

+user;           // 42       (hint: "number")
`${user}`;       // "Victor" (hint: "string")
user + 10;       // 52       (hint: "default")
```

The **hint** parameter is automatically inserted by the JS engine — it's either `"number"`, `"string"`, or `"default"` depending on the coercion context.

### Metaprogramming
The ability to override default language behaviors and access built-in features like iterators, async features, and coercion. Symbols are the primary mechanism for metaprogramming in JS.

---

## 10. Asynchronous JavaScript

### Web Browser APIs (Facade Functions)
JS functions that look like regular functions but actually trigger **web browser features** (or Node background features). They serve as an interface between JS and the runtime environment.

Examples: `setTimeout`, `fetch`, `addEventListener`, `console.log`, `DOM APIs`

These are NOT part of the JS language specification — they are provided by the runtime (browser or Node.js).

### Callback Queue (Task Queue)
An interface between the outside world (browser features) and the JS engine. Functions ready to execute from async operations wait here until:
1. All global code has finished executing
2. The call stack is empty

**Rule**: Functions in the callback queue **cannot** execute until all synchronous code has finished and the call stack is empty.

### Microtask Queue
A **higher-priority** queue used by Promises and related APIs. The event loop checks the microtask queue **before** the callback queue.

| Microtask Queue (higher priority) | Callback Queue (lower priority) |
|---|---|
| Promises (`.then`, `.catch`, `.finally`) | `setTimeout` / `setInterval` |
| `async/await` continuations | I/O events |
| `MutationObserver` | User events (click, scroll) |
| `queueMicrotask()` | `setImmediate` (Node.js) |
| | `requestAnimationFrame` |

### Event Loop
Continuously checks three things:
1. Is the call stack empty?
2. Has all global code finished running?
3. Is there something in the microtask queue? (check first) Then the callback queue?

```
┌──────────────────────────────────┐
│         Call Stack               │
│   (executes synchronous code)    │
└───────────────┬──────────────────┘
                │ empty?
        ┌───────▼───────┐
        │  Event Loop   │ ← checks continuously
        └───┬───────┬───┘
            │       │
   ┌────────▼──┐ ┌──▼──────────┐
   │ Microtask │ │  Callback   │
   │  Queue    │ │   Queue     │
   │ (first!)  │ │ (second)    │
   └───────────┘ └─────────────┘
```

### Event Loop: Browser vs Node.js

**Browser cycle:**
1. Sync code
2. Microtasks (all of them)
3. Rendering (layout, paint)
4. Macrotasks (one)
5. Repeat from step 2

**Node.js cycle (libuv):**
1. Timers (`setTimeout`, `setInterval`)
2. Intermediate check (`process.nextTick` + Promises)
3. Pending I/O callbacks
4. Intermediate check
5. Idle
6. Poll (retrieve I/O, wait)
7. Intermediate check
8. Check (`setImmediate`)
9. Close callbacks
10. Intermediate check

### Promises

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation. Think of it as a **placeholder** for a value you don't have yet.

**3 states:**
| State | Meaning | Triggers |
|---|---|---|
| **Pending** | Operation still processing | Initial state |
| **Fulfilled** | Operation completed successfully | `.then()` handlers |
| **Rejected** | Operation failed | `.catch()` handlers |

Once settled (fulfilled or rejected), a Promise **cannot change state**.

```js
const promise = fetch("https://api.example.com/data");
// promise is Pending...

promise
  .then(response => response.json())   // Fulfilled — process data
  .catch(error => console.error(error)); // Rejected — handle error
```

---

## 11. Prototype Chain & OOP

### Two Paradigms for Data + Functionality Together
- **OOP** — bundles data and functionality within objects
- **Functional Programming** — uses closures (functions with associated persistent data)

### Prototype Chain
JS's fundamental mechanism for inheritance. Unlike Java/C++ (static classes), JS links **objects directly to other objects**.

**Key properties:**
| Property | What it is | Where it exists |
|---|---|---|
| `[[Prototype]]` | Internal (hidden) link to the prototype | On every object |
| `__proto__` | Legacy accessor for `[[Prototype]]` | On every object (discouraged) |
| `.prototype` | Object that will become `[[Prototype]]` of instances | Only on constructor functions & classes |
| `Object.prototype` | The "root" prototype — parent of almost all objects | Built-in |

```js
const animal = { eats: true };
const rabbit = Object.create(animal);  // rabbit.[[Prototype]] → animal

console.log(rabbit.eats);  // true  (found via prototype chain)
console.log(rabbit.jumps); // undefined (not found anywhere)
```

### Method Lookup Order
When accessing a property/method, JS searches:
1. **The object itself** (own properties)
2. **The immediate prototype** (`[[Prototype]]`)
3. **Up the prototype chain**
4. **`Object.prototype`** (contains `toString`, `valueOf`, `hasOwnProperty`, etc.)
5. **`null`** → `undefined` (end of chain)

### Shadowing
If you define a property on an object that already exists in its prototype, JS uses the **own property**:

```js
const animal = { sound: "Generic noise" };
const cat = Object.create(animal);

cat.sound = "Meow";
console.log(cat.sound);    // "Meow"    (own property wins)
console.log(animal.sound); // "Generic noise" (prototype unchanged)
```

### `hasOwnProperty()`
Checks if a property belongs directly to the object (not inherited):

```js
cat.hasOwnProperty("sound"); // true  (own property)
cat.hasOwnProperty("eats");  // false (inherited from prototype)
```

### The `new` Keyword
Automates 3 tasks when calling a constructor function:
1. **Creates** a new empty object and assigns it to `this`
2. **Links** the new object's `[[Prototype]]` to `Constructor.prototype`
3. **Returns** the newly created object (implicitly)

```js
function UserCreator(name, score) {
  this.name = name;   // 'this' is the auto-created object
  this.score = score;
}
UserCreator.prototype.increment = function() { this.score++; };

const user1 = new UserCreator("Victor", 0);
// 1. Creates {} and assigns to 'this'
// 2. Sets {}.__proto__ = UserCreator.prototype
// 3. Returns the object → stored in user1
```

**Without `new`**: no object is created, `this` points to `window`/`undefined`, properties leak to global scope.

### Dual Nature of Functions
Functions are both **functions** and **objects**:
- As a **function** → can be called with `()`
- As an **object** → can have properties assigned to it

Every function automatically has a `.prototype` property (initially an empty object) — this is where shared methods live.

```
UserCreator (function-object combo)
├── function behavior: (name, score) { this.name = name; ... }
└── object properties:
    └── prototype: {
          increment: function() { this.score++; }
        }
```

### `class` Syntax (Syntactic Sugar)
Under the hood, `class` creates the **same function-object combo**:

```js
class UserCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  increment() {
    this.score++;  // Automatically added to UserCreator.prototype
  }
}
// Identical behavior to the constructor function pattern above
```

**What `class` creates under the hood:**
- A function (the `constructor` becomes the function body)
- An object with a `prototype` property (methods go here automatically)

### `static` Methods
Added directly to the **function object itself**, NOT to `.prototype`:

```js
class UserCreator {
  static describe() {
    return "Creates user objects";
  }
}

UserCreator.describe(); // ✅ Called on the class itself
const user = new UserCreator();
user.describe();        // ❌ TypeError — not on prototype
```

### Public Instance Fields
Properties declared in the class body (outside constructor):

```js
class User {
  role = "member";  // Public instance field

  constructor(name) {
    this.name = name;
  }
}

const u = new User("Victor");
u.role; // "member" — added to each instance BEFORE constructor code runs
```

Stored initially in a hidden `fields` property on the class. When `new` is used, they are assigned to the object before any constructor code executes.

### Private Fields (`#`)
Stored in a separate hidden, inaccessible portion of the object:

```js
class BankAccount {
  #balance = 0;  // Private — only accessible inside the class

  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
acc.getBalance();   // 100
acc.#balance;       // ❌ SyntaxError: Private field
```

---

## 12. Gaps Identified — Topics in INTERVIEW_PREP_JS.md NOT in Your Handnotes

Your handnotes cover the **engine internals** deeply (execution contexts, closures, prototype chain, coercion, memory model), which is excellent. However, the existing `INTERVIEW_PREP_JS.md` contains several **practical/applied** topics you should also review:

| Topic | Why It Matters | Section in INTERVIEW_PREP_JS.md |
|---|---|---|
| **Promise combinators** (`Promise.all`, `allSettled`, `race`, `any`) | Very common interview question | Q8 |
| **Generators & Iterators** (`function*`, `yield`) | Less common but shows depth | Q9 |
| **Immutability** (spread, structuredClone, Immer) | Core React concept | Q10 |
| **Array methods** (`map`, `filter`, `reduce`, `find`, `some`, `flatMap`) | Daily usage | Q11 |
| **Shallow vs Deep copy** | Critical for React state | Q12 |
| **Destructuring, Spread, Rest** | Used in every file | Q13 |
| **Hoisting** (standalone, detailed with function expressions) | Classic interview question | Q14 |
| **ES6+ features overview** (optional chaining, nullish coalescing, etc.) | Modern JS fluency | Q16 |
| **Map vs Object, Set vs Array** | Performance & data structures | Q17 |
| **Event delegation & bubbling** (DOM events) | Frontend fundamentals | Q18 |
| **localStorage vs sessionStorage vs cookies** | Storage & security | Q19 |
| **CORS** | API integration | Q20 |
| **Memory leaks** (causes, detection, React-specific) | Performance | Q21 |
| **Debounce vs Throttle** (implementations) | Performance optimization | Q22 |
| **CommonJS vs ES Modules** | Build tooling | Q23 |
| **Bundlers** (Webpack vs Vite) | Tooling knowledge | Q24 |
| **Security** (XSS, CSRF, CSP) | Security awareness | Q25 |
| **`Object.is()`** | React uses it internally for state comparison | Q6 |

### Topics in Your Handnotes NOT in the Existing File (Your Unique Depth)

These topics show **engine-level understanding** that goes beyond the existing prep:

- Execution context lifecycle (creation, memory allocation, destruction)
- Stack vs Heap memory model (how primitives vs objects are stored)
- `[[scope]]` hidden property and the closure "backpack" mental model
- C.O.V.E. / P.L.S.R.D. formal names
- Lexical vs dynamic scoping (with example)
- Variable lookup order (local → closure → global)
- `Symbol.toPrimitive` and the `hint` parameter
- Metaprogramming concept
- Facade functions concept
- Dual nature of functions (function + object combo)
- Public instance fields and their hidden storage
- Private fields (`#` syntax)
- Microtask vs callback queue with Node.js event loop phases

---

*Generated from handwritten notes — 2026-03-15*
