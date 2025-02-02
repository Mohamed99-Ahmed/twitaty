// components/Pagination.tsx
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : null;
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : null;

  return (
    <div className="flex justify-center space-x-4 mt-8">
      {prevPage && (
        <Link href={`/?page=${prevPage}`} passHref>
          <a className="px-4 py-2 bg-blue-500 text-white rounded">Previous</a>
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <Link key={i + 1} href={`/?page=${i + 1}`} passHref>
          <a
            className={`px-4 py-2 ${
              currentPage === i + 1 ? 'bg-blue-700' : 'bg-blue-500'
            } text-white rounded`}
          >
            {i + 1}
          </a>
        </Link>
      ))}

      {nextPage && (
        <Link href={`/?page=${nextPage}`} passHref>
          <a className="px-4 py-2 bg-blue-500 text-white rounded">Next</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;