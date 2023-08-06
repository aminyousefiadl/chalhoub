import { useConfig } from "@/context/information.context";

export const Pagination = () => {
  const {
    setInformation,
    information: { page, limit },
    products,
  } = useConfig();

  if (
    (limit !== "All" && products?.data.length !== 0, products?.totalPages === 1)
  )
    return null;

  return (
    <nav
      aria-label="Page navigation example "
      className="flex justify-center mt-8"
    >
      <ul className="inline-flex -space-x-px text-sm">
        <li
          className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700  "
          onClick={() => setInformation({ page: page !== 1 ? page - 1 : 1 })}
        >
          Previous
        </li>

        {Array(products?.totalPages)
          .fill("")
          .map((_el, i) => (
            <li
              key={i}
              onClick={() => setInformation({ page: i + 1 })}
              className={`${
                page === i + 1 ? "bg-gray-200 text-primary" : ""
              } cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  `}
            >
              {i + 1}
            </li>
          ))}
        <li
          onClick={() => setInformation({ page: page !== 5 ? page + 1 : 5 })}
          className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700  "
        >
          Next
        </li>
      </ul>
    </nav>
  );
};
