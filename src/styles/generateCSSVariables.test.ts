import {
  generateCssGetters,
  generateCssVariables,
} from "./generateCSSVariables";
import { Theme } from "./theme";

describe("generateCssVariables", () => {
  const nestedObject = {
    foo: "1",
    bar: { foo: "2" },
    baz: { bar: { foo: "3" } },
    qux: { baz: { bar: { foo: "4" } } },
  };
  it("should serialized nested objects", () => {
    expect(generateCssVariables(nestedObject as unknown as Theme)).toEqual([
      "--foo: 1;",
      "--bar-foo: 2;",
      "--baz-bar-foo: 3;",
      "--qux-baz-bar-foo: 4;",
    ]);
  });
  it("should work with the other one", () => {
    expect(generateCssGetters(nestedObject)).toEqual({
      foo: "--foo",
      bar: { foo: "--bar-foo" },
      baz: { bar: { foo: "--baz-bar-foo" } },
      qux: { baz: { bar: { foo: "--qux-baz-bar-foo" } } },
    });
  });
});
