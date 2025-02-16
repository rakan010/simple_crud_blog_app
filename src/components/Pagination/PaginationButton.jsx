function PaginationButton({ onClick, disabled, className, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
