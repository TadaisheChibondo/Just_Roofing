export default function WhatsAppButton() {
  // Convert 071 278 9951 to the international format for the API
  const waNumber = "263712789951";
  const defaultMessage = "Hi Just Roofing, I'm interested in your materials.";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1EBE5D] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.124.553 4.195 1.604 6.012L.263 24l6.113-1.604c1.761.996 3.766 1.523 5.845 1.523 6.648 0 12.031-5.383 12.031-12.031C24.252 5.383 18.869 0 12.031 0zm0 21.844c-1.805 0-3.578-.484-5.125-1.406l-.367-.211-3.812.996.996-3.812-.234-.367c-1.008-1.586-1.539-3.414-1.539-5.266 0-5.461 4.438-9.898 9.898-9.898 5.461 0 9.898 4.438 9.898 9.898 0 5.461-4.438 9.898-9.898 9.898zm5.422-7.414c-.297-.148-1.758-.867-2.031-.969-.273-.094-.469-.148-.672.148-.195.297-.766.969-.938 1.172-.172.203-.344.227-.641.078-2.047-1.023-3.328-2.148-4.32-3.852-.156-.273-.016-.422.133-.57.141-.141.297-.344.453-.516.148-.172.203-.297.297-.492.102-.203.047-.383-.023-.531-.078-.148-.672-1.617-.922-2.211-.242-.578-.492-.5-.672-.508h-.578c-.203 0-.531.078-.813.383C5.922 8.367 5.094 9.141 5.094 10.664c0 1.523 1.141 2.992 1.297 3.203.156.203 2.188 3.336 5.305 4.68.742.32 1.32.508 1.773.648.742.234 1.422.203 1.953.125.594-.086 1.758-.719 2.008-1.414.25-.695.25-1.289.172-1.414-.078-.125-.273-.203-.57-.352z" />
      </svg>
    </a>
  );
}
