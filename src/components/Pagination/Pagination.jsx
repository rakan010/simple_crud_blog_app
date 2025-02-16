import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import PaginationButton from "./PaginationButton";
import PageNumber from "./PageNumber";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 py-4 mt-12">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={
          currentPage === 1
            ? "text-gray-600 cursor-not-allowed"
            : "text-sky-400 hover:bg-gray-800"
        }
      >
        <IoChevronBackOutline className="text-xl" />
      </PaginationButton>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        if (
          pageNumber === 1 ||
          pageNumber === totalPages ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <PageNumber
              key={pageNumber}
              pageNumber={pageNumber}
              currentPage={currentPage}
              onClick={onPageChange}
            />
          );
        } else if (
          pageNumber === currentPage - 2 ||
          pageNumber === currentPage + 2
        ) {
          return (
            <span
              key={pageNumber}
              className="w-10 h-10 flex items-center justify-center text-gray-400"
            >
              ...
            </span>
          );
        }
        return null;
      })}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages
            ? "text-gray-600 cursor-not-allowed"
            : "text-sky-400 hover:bg-gray-800"
        }
      >
        <IoChevronForwardOutline className="text-xl" />
      </PaginationButton>
    </div>
  );
}

export default Pagination;
