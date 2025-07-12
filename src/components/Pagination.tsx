type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  disableNext: boolean;
};

const Pagination = ({ currentPage, onPageChange, disableNext }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-4 py-2">{currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disableNext}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
