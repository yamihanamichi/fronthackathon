// src/components/ui/button.jsx
export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
