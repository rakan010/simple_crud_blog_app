function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-16 h-16 rounded-full border-4 border-gray-700 border-t-sky-500 animate-spin"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rotate-45">
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
