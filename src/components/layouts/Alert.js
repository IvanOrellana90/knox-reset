export function Alert({ message }) {
  return (
    <div
      className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
      role="alert"
    >
      {message}
    </div>
  );
}