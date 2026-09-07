import { useState } from "react";
import { useCart } from "../CartContext"; // Adjust this path to wherever you place CartContext.jsx

export default function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "Fix and Supply",
    material: "",
    details: "",
  });

  const { cartItems, addToCart, removeFromCart, deleteFromCart, clearCart } =
    useCart();

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the cart section of the message, if the cart has anything in it
    const cartLines =
      cartItems.length > 0
        ? cartItems
            .map(
              (item) =>
                `- ${item.name} x${item.quantity} ($${(
                  item.price * item.quantity
                ).toFixed(2)})`,
            )
            .join("%0A")
        : "None selected";

    // Construct the formatted message for WhatsApp
    const message =
      `*NEW QUOTE REQUEST*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Service Needed:* ${formData.serviceType}%0A` +
      `*Preferred Material:* ${formData.material}%0A` +
      `*Additional Details:* ${formData.details}%0A%0A` +
      `*Cart Items:*%0A${cartLines}%0A` +
      `*Cart Total:* $${cartTotal.toFixed(2)}`;

    // Redirect to Leanard's WhatsApp
    const waNumber = "263712789951";
    window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-brand-blue mb-6 text-center">
        Request a Quote
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Fill out the details below and we will get back to you instantly via
        WhatsApp.
      </p>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Your Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </h3>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Your cart is empty. Add products from the catalog to include them in
            your quote request.
          </p>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded border border-gray-200 flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price}
                        {item.price_note && ` / ${item.price_note}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove one ${item.name}`}
                      className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-800 font-bold"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      aria-label={`Add one more ${item.name}`}
                      className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-800 font-bold"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="ml-1 text-sm text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-600 font-semibold"
              >
                Clear cart
              </button>
              <span className="text-lg font-extrabold text-brand-blue">
                Total: ${cartTotal.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Service Required
          </label>
          <select
            name="serviceType"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-blue"
          >
            <option value="Fix and Supply">
              Fix and Supply (Full Installation)
            </option>
            <option value="Supply Only">Materials Supply Only</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Material Preference (if known)
          </label>
          <input
            type="text"
            name="material"
            placeholder="e.g., IBR Sheets, Alububble, Barbed Wire"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Project Details
          </label>
          <textarea
            name="details"
            rows="4"
            placeholder="Briefly describe your project (e.g., Roof size, location, timeline)"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-blue"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded transition-colors text-lg"
        >
          Send via WhatsApp
        </button>
      </form>
    </div>
  );
}
