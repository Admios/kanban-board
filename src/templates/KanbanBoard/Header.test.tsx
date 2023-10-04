import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { Layout } from "./Layout";
import { clearCookies } from "./clearCookies";
import { useZustand } from "./model";

jest.mock("./clearCookies.ts");
jest.mock("./kanbanActions.ts");

it("should launch login when button is pressed", async () => {
  const { push } = (useRouter as jest.Mock)();
  const { container } = render(<Layout />);
  expect(container).toMatchSnapshot("Default Header");

  // Click the button
  const button = screen.getByRole("button", { name: "Login / Register" });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(push).toHaveBeenCalledWith("/login");
});

it("should launch logout when button is pressed", async () => {
  useZustand.setState({
    user: {
      username: "test",
    },
  });

  const { push } = (useRouter as jest.Mock)();
  const { container } = render(<Layout />);
  expect(container).toMatchSnapshot("Logged in Header");

  // Click the button
  const button = screen.getByRole("button", { name: "Logout" });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(clearCookies).toHaveBeenCalled();
  expect(push).toHaveBeenCalledWith("/login");

  useZustand.setState({});
});