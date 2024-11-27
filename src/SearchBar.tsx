import { useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const PRODUCT_API = `https://dummyjson.com/products/search?q=`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchTerm: string): Promise<void> => {
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(`${PRODUCT_API}${searchTerm}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }

      const { products } = await response.json();

      setResults(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      fetchResults(searchTerm.trim());
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  return (
    <div className="w-screen">
      <div className="fixed top-0 left-0 w-full px-4 py-4 bg-gray-100 shadow-md z-50">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-lg shadow-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </div>
        {(loading || results.length > 0) && (
          <div className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
            {loading && (
              <p className="p-4 text-center text-sm text-gray-500 animate-pulse">
                Loading...
              </p>
            )}

            {!loading && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {product.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-16 h-16 mr-4 rounded-lg object-cover"
                      />
                    )}

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!loading && results.length === 0 && (
          <p className="p-4 text-center text-sm text-gray-500">
            No results found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
