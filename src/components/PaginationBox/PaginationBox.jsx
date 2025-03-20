import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationBox({ totalPage, currentPage, onPageChange }) {
  const paginationItems = getPaginationItems(currentPage, totalPage);

  const handlePageChange = (page) => {
    if (onPageChange && page >= 1 && page <= totalPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {paginationItems.map((item, index) => (
          <PaginationItem key={index}>
            {item === "..." ? (
              <span>{item}</span>
            ) : (
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(item)}
                isActive={item === currentPage}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const getPaginationItems = (currentPage, totalPages) => {
  const paginationItems = [];

  if (totalPages <= 8) {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(i);
    }
  } else {
    paginationItems.push(1); // Trang đầu

    if (currentPage > 3) {
      paginationItems.push("...");
    }

    // Các trang gần với trang hiện tại
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      paginationItems.push(i);
    }

    if (currentPage < totalPages - 2) {
      paginationItems.push("...");
    }

    paginationItems.push(totalPages); // Trang cuối
  }

  return paginationItems;
};
