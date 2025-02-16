function PageNumber({ pageNumber, currentPage, onClick }) {
  return (
    <button
      onClick={() => onClick(pageNumber)}
      className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
        currentPage === pageNumber
          ? "bg-sky-500 text-white"
          : "text-gray-400 hover:bg-gray-800"
      }`}
    >
      {pageNumber}
    </button>
  );
}

export default PageNumber;
