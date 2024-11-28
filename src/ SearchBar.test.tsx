import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("renders the search input field", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search products");
    expect(input).toBeInTheDocument();
  });

  it("shows loading indicator when fetching results", async () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search products");
    fireEvent.change(inputElement, { target: { value: "phone" } });

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it("displays fetched product results", async () => {
    const mockProducts = [
      { id: 1, title: "Phone 1", price: 499, thumbnail: "phone1.jpg" },
      { id: 2, title: "Phone 2", price: 699, thumbnail: "phone2.jpg" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: mockProducts }),
    }) as unknown as typeof fetch;

    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search products");
    fireEvent.change(inputElement, { target: { value: "phone" } });

    await waitFor(() => {
      expect(screen.getByText("Phone 1")).toBeInTheDocument();
      expect(screen.getByText("Phone 2")).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  it("displays 'No results found' when no products are fetched", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ products: [] }),
      })
    ) as unknown as typeof fetch;

    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search products");
    fireEvent.change(inputElement, { target: { value: "unknown" } });

    await waitFor(() => {
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  it("handles API errors gracefully", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("API Error"))
    ) as unknown as typeof fetch;

    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search products");
    fireEvent.change(inputElement, { target: { value: "error" } });

    await waitFor(() => {
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  it("debounces the API call", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ products: [] }),
      })
    ) as unknown as typeof fetch;
    global.fetch = fetchMock;

    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("Search products");
    fireEvent.change(inputElement, { target: { value: "test" } });

    vi.advanceTimersByTime(150);
    expect(fetchMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(150);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.restoreAllMocks();
    vi.useRealTimers();
  });
});
