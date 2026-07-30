import { useState, useEffect } from "react";
import axios from "axios";

export default function Catalog() {
  // 1. Set up state for products, loading status, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch the data when the component mounts
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(
          "Failed to load catalog. Please ensure the server is running.",
        );
        setLoading(false);
      });
  }, []);

  // 3. Handle Loading and Error States
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-brand-blue animate-pulse">
          Loading inventory...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-medium">{error}</div>
    );
  }

  // 4. Render the Product Grid
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">
        Product Catalog
      </h2>

      {/* CSS Grid for responsive cards (1 column mobile, 2 tablet, 3 desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]"
          >
            {/* Product Image Area */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  No Image Available
                </span>
              )}
            </div>

            {/* Product Details Area */}
            <div className="p-5">
              <div className="text-xs text-brand-accent font-bold uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {product.name}
              </h3>

              {product.specification && (
                <p className="text-gray-600 text-sm mt-1">
                  {product.specification}
                </p>
              )}

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-brand-blue">
                  ${product.price}
                </span>
                {product.price_note && (
                  <span className="text-sm text-gray-500">
                    / {product.price_note}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
