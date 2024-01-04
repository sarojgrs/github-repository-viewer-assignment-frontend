import "../styles/pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      // Show the first two pages, current page, and the last two pages
      if (
        i === 1 ||
        i === 2 ||
        i === currentPage ||
        i === totalPages ||
        i === totalPages - 1 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      } else if (
        // Show ellipsis (...) if there's a gap between the first two pages and the current page
        i === 3 &&
        currentPage > 4
      ) {
        pageNumbers.push(
          <span key={i} className="pagination-ellipsis">
            ...
          </span>
        );
      } else if (
        // Show ellipsis (...) if there's a gap between the current page and the last two pages
        i === totalPages - 2 &&
        currentPage < totalPages - 3
      ) {
        pageNumbers.push(
          <span key={i} className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
