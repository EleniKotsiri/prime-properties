import Link from "next/link";

const Pagination = ({currentPage, pageSize, totalItems}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      { currentPage > 1 ? (
        <Link href={`/properties?page=${currentPage - 1}`} className="mr-2 px-2 py-1 border border-gray-300 rounded">
          Previous
        </Link>
      ) : null}
      <span className="mx-2">Page {currentPage} of {totalPages}</span>
      { currentPage < totalPages ? (
        <Link href={`/properties?page=${currentPage + 1}`} className="mr-2 px-2 py-1 border border-gray-300 rounded">
          Next
        </Link>
      ) : null}
    </section>
  );
}
export default Pagination