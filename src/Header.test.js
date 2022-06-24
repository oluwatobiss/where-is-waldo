import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./components/Header";

test("app's logo text", () => {
  render(<Header />);
  const logoElement = screen.getByTitle("Home");
  expect(logoElement).toHaveTextContent(/Find →/i);
});
