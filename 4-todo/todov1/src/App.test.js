// src/App.test.js

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App.jsx";

test("renders 'learn react' link with correct href", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /learn react/i });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "https://reactjs.org");
});
