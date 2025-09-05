import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";

export default function PaginationComponent() {
  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">Showing 1 to 10 of 100 records</div>
      <div className="pagination-controls">
        <button className="pagination-btn" disabled title="First Page">
          <FaAngleDoubleLeft size={18} />
        </button>
        <button className="pagination-btn" disabled title="Previous Page">
          <FaAngleLeft size={18} />
        </button>
        <button className="pagination-btn" title="Next Page">
          <FaAngleRight size={18} />
        </button>
        <button className="pagination-btn" title="Last Page">
          <FaAngleDoubleRight size={18} />
        </button>
      </div>
    </div>
  );
}
