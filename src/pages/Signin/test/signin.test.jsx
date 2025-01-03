import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signin from "../Signin";
import { AuthProvider } from "../../context/auth";
import { test, expect } from "@jest/globals";

test("renders login form", () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    </AuthProvider>
  );
  const emailInput = screen.getByPlaceholderText(/Digite seu E-mail/i);
  const passwordInput = screen.getByPlaceholderText(/Digite sua Senha/i);
  const loginButton = screen.getByText(/Entrar/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("shows error message when fields are empty", () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    </AuthProvider>
  );
  const loginButton = screen.getByText(/Entrar/i);
  fireEvent.click(loginButton);
  const errorMessage = screen.getByText(/Preencha todos os campos/i);
  expect(errorMessage).toBeInTheDocument();
});
