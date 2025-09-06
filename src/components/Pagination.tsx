import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";

export default function PaginationComponent({ data, onPageChange }) {
  const { page = 1, limit = 10, totalResults = 0, totalPages = 1, results = [] } = data || {};
  const from = totalResults === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalResults);

  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">
        Showing {from} to {to} of {totalResults} records
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          disabled={page === 1}
          title="First Page"
          onClick={() => onPageChange && onPageChange(1)}
        >
          <FaAngleDoubleLeft size={18} />
        </button>
        <button
          className="pagination-btn"
          disabled={page === 1}
          title="Previous Page"
          onClick={() => onPageChange && onPageChange(page - 1)}
        >
          <FaAngleLeft size={18} />
        </button>
        <button
          className="pagination-btn"
          disabled={page === totalPages || totalPages === 0}
          title="Next Page"
          onClick={() => onPageChange && onPageChange(page + 1)}
        >
          <FaAngleRight size={18} />
        </button>
        <button
          className="pagination-btn"
          disabled={page === totalPages || totalPages === 0}
          title="Last Page"
          onClick={() => onPageChange && onPageChange(totalPages)}
        >
          <FaAngleDoubleRight size={18} />
        </button>
      </div>
    </div>
  );
}
