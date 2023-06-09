import React from "react";
import Pagination from "react-bootstrap/Pagination";

const BlogPagination = ({ page, setPage, totalPageNumber }) => {
  let items = [];
  console.log(page);
  const [currentPage, setCurrentPage] = React.useState(1);
  for (let number = 1; number <= totalPageNumber; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => {
          setPage(number);
          setCurrentPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>
        {/* prev button */}
        {page === 1 ? (
          <Pagination.Item disabled>Prev</Pagination.Item>
        ) : (
          <Pagination.Item
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Prev
          </Pagination.Item>
        )}
        {/* all numbers of pages */}
        {items}
        {/* next button */}
        {page === totalPageNumber ? (
          <Pagination.Item disabled>Next</Pagination.Item>
        ) : (
          <Pagination.Item
            onClick={() => {
              if (currentPage < totalPageNumber) {
                setPage(page + 1);
              }
            }}
          >
            Next
          </Pagination.Item>
        )}
      </Pagination>
    </div>
  );
};

export default BlogPagination;
