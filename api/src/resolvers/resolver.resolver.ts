import data from "../seed.data.json";

enum SortOptions {
  RECOMMENDED = "RECOMMENDED",
  CHEAPEST = "CHEAPEST",
  NEW = "NEW",
}

interface PriceFilter {
  min: number;
  max: number;
}

interface ProductsQueryArgs {
  page?: number;
  limit?: number;
  color?: string;
  price?: PriceFilter;
  sort?: SortOptions;
}

export const resolvers = {
  Query: {
    products: (parent: any, args: ProductsQueryArgs, context: any) => {
      const { page = 1, limit, color, price, sort } = args;
      let filteredData = [...data];

      // Filter based on sort option
      if (sort) {
        switch (sort) {
          case SortOptions.RECOMMENDED:
            filteredData = filteredData.filter((item) => item.recommended);
            break;
          case SortOptions.CHEAPEST:
            filteredData.sort((a, b) => a.price - b.price);
            break;
          case SortOptions.NEW:
            filteredData = filteredData.filter((item) => {
              return new Date(item.createdAt).getFullYear() > 2022;
            });
            break;
        }
      }

      // Apply other filters
      if (color) {
        filteredData = filteredData.filter(
          (product) => product.color === color
        );
      }

      if (price) {
        filteredData = filteredData.filter(
          (product) => product.price >= price.min && product.price <= price.max
        );
      }

      if (!limit || !page)
        return {
          data: filteredData,
          count: filteredData.length,
          totalCount: filteredData.length,
          nextPage: null,
          prevPage: null,
          totalPages: 1,
        };

      // Calculate pagination info
      const totalCount = filteredData.length;
      const totalPages = Math.ceil(totalCount / limit);
      const nextPage = page + 1 > totalPages ? null : page + 1;
      const prevPage = page - 1 <= 0 ? null : page - 1;

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        count: paginatedData.length,
        totalCount,
        nextPage,
        prevPage,
        totalPages,
      };
    },
  },
};
