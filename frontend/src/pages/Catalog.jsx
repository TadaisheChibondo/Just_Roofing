import { useState } from "react";
import { Link } from "react-router-dom";
import { catalogData } from "../data"; // Adjust this path if your data.js is in a different folder
import { useCart } from "../CartContext"; // Adjust this path to wherever you place CartContext.jsx

export default function Catalog() {
  // 1. Assign static data directly instead of using state
  const products = catalogData;

  // 2. Cart state (shared with Quote.jsx via context)
  const { cartItems, addToCart, removeFromCart } = useCart();

  // 3. Lightbox state for viewing a full product image
  const [lightboxImage, setLightboxImage] = useState(null);

  const getQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">
        Product Catalog
      </h2>

      {/* CSS Grid for responsive cards (1 column mobile, 2 tablet, 3 desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const quantity = getQuantity(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]"
            >
              {/* Product Image Area - click to view full image */}
              <button
                type="button"
                onClick={() => product.image && setLightboxImage(product)}
                className={`h-48 w-full bg-gray-100 flex items-center justify-center border-b border-gray-200 ${
                  product.image ? "cursor-zoom-in" : "cursor-default"
                }`}
              >
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
              </button>

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

                {/* Cart Controls */}
                <div className="mt-4">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="w-full bg-brand-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between border border-gray-300 rounded overflow-hidden">
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove one ${product.name} from cart`}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-bold text-gray-900">
                        {quantity} in cart
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add one more ${product.name} to cart`}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/quote"
          className="bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded transition-colors"
        >
          View Cart
        </Link>
      </div>

      {/* Lightbox Modal for viewing the full product image */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="Close image"
            className="absolute top-4 right-4 text-white text-3xl font-bold leading-none hover:text-gray-300"
          >
            &times;
          </button>
          <div
            className="max-w-3xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.name}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-white text-center mt-3 font-semibold">
              {lightboxImage.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
