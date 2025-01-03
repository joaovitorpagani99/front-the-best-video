import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";
import { test, expect, jest } from "@jest/globals";

test("renders input with placeholder", () => {
  render(
    <Input
      types="text"
      placeholder="Digite seu nome"
      value=""
      onChange={() => {}}
    />
  );
  const inputElement = screen.getByPlaceholderText(/Digite seu nome/i);
  expect(inputElement).toBeInTheDocument();
});

test("calls onChange when input value changes", () => {
  const handleChange = jest.fn();
  render(
    <Input
      types="text"
      placeholder="Digite seu nome"
      value=""
      onChange={handleChange}
    />
  );
  const inputElement = screen.getByPlaceholderText(/Digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
