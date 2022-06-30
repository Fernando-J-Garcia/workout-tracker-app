import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationComponentInterface {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}
export default function PaginationComponent({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: PaginationComponentInterface) {
  const paginationItems = [];
  //display from one instead of zero
  const numberOfPages = Math.ceil(totalPosts / postsPerPage) + 1;
  for (let i = 1; i < numberOfPages; i++) {
    const item = (
      <Pagination.Item
        key={i}
        active={i - 1 === currentPage}
        onClick={() => paginate(i - 1)}
      >
        {i}
      </Pagination.Item>
    );
    paginationItems.push(item);
  }
  return <Pagination className="mt-2">{paginationItems}</Pagination>;
}
