import { getImageUrl } from "../api";

describe("getImageUrl", () => {
  test("retourne placeholder si vide", () => {
    expect(getImageUrl("")).toBe("/placeholder.jpg");
  });

  test("retourne URL externe", () => {
    const url = "https://test.com/image.jpg";
    expect(getImageUrl(url)).toBe(url);
  });

  test("concatène URL locale", () => {
    expect(getImageUrl("/image.jpg")).toContain("http://localhost:4000");
  });
});