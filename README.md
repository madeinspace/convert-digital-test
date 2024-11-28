# React Search Bar with API Integration

This project is a technical test for Convert Digital, it implements a React-based search bar component that interacts with the API:
https://dummyjson.com/products/search?q=[x]

The search bar allows users to search for products by keyword and displays results in a dropdown list with relevant product details.

---

## Features

- **Dynamic Search:** Fetches results from the API based on the user’s input.
- **Debouncing:** Optimized API calls to prevent excessive requests during typing.
- **Dropdown Display:** Shows product results with a grid layout including images, titles, and prices.
- **Responsive Design:** Uses **Tailwind CSS** for a simple and responsive layout.
- **Testing:** Includes unit tests.

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/madeinspace/convert-digital-test
cd convert-digital-test
```

### 2. Install Dependencies

Ensure you have Node.js installed. Then, run:

```bash
npm install
```

### 3. Run the Application

Start the development server:

```bash
npm run dev
```

### 4. Testing the Application

This project uses Vitest and React Testing Library for unit and integration tests.

Run Tests:

```bash
npm run test
```

### 5. Technologies Used

    •	Vite: Development and build tooling.
    •	React: Component-based UI development.
    •	Tailwind CSS: For styling.
    •	Vitest: Testing framework.
    •	React Testing Library.
