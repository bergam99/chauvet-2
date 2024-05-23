import { render, screen } from "@testing-library/react";
import Logo from "@/components/logo/logo";

describe("Logo", () => {
  it("renders the Logo component", () => {
    render(<Logo />);

    screen.debug();
  });
});
