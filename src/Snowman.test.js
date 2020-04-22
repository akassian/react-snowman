import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

// smoke test
it("renders without crashing", function () {
  render(<Snowman />);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("changes to img1 after 1st wrong guess", function () {
  const { queryByText, queryByAltText } = render(<Snowman />);

  // click on the button
  let z = queryByText("z");
  fireEvent.click(z);
  const img = queryByAltText("Snowman Pic");

  // is the count different?
  expect(img).toHaveAttribute("src", "1.png");
});

it("lose at maxWrongs", function () {
  const { queryByText, queryByAltText } = render(<Snowman maxWrong={0} />);

  let z = queryByText("z");
  expect(z).toEqual(null);
  expect(z).not.toBeInTheDocument();

  let lose = queryByText("You Lose");
  expect(lose).not.toEqual(null);
  expect(lose).toBeInTheDocument();
});
