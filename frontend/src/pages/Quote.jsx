import { useState } from "react";

export default function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "Fix and Supply",
    material: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the formatted message for WhatsApp
    const message =
      `*NEW QUOTE REQUEST*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Service Needed:* ${formData.serviceType}%0A` +
      `*Preferred Material:* ${formData.material}%0A` +
      `*Additional Details:* ${formData.details}`;

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
