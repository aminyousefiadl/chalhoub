/* eslint-disable react/display-name */
"use client";

import Image from "next/image";
import { Pagination } from "./Pagination";
import { useConfig } from "@/context/information.context";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React, { useEffect } from "react";
import { PRODUCTS } from "@/queries";
import { Product, Products } from "@/types";

interface Response {
  products: Products;
}

const TILE_CLASSNAMES = {
  "4": "md:grid-cols-4",
  "6": "md:grid-cols-6",
  "8": "md:grid-cols-8",
};

const Tile = React.memo(({ el }: { el: Product }) => {
  return (
    <div className="rounded-lg flex flex-col md:hover:scale-[1.02] md:hover:shadow-lg transition-[transform] duration-300 ease-out">
      <div className="h-36 md:h-56 relative rounded-t-lg">
        <Image
          placeholder="blur"
          blurDataURL={el.imageUrl}
          alt={el.title}
          className="rounded-t-lg object-contain"
          src={el.imageUrl}
          fill
        />
      </div>
      <div className="py-4 px-2">
        <p className="font-bold">{el.title}</p>
        <p className="text-gray-400 text-sm">{el.brand}</p>
        <p className="mt-8 text-primary font-bold">
          {`$${el.price.toLocaleString()}`}{" "}
        </p>
      </div>
    </div>
  );
});

export const TileWithSort = () => {
  const {
    information: { displayCols, limit, page, color, priceRange, sortType },
    products,
    setProducts,
    skip,
  } = useConfig();

  const { data } = useSuspenseQuery<Response>(PRODUCTS, {
    variables: {
      page,
      limit: limit === "All" ? null : parseInt(limit),
      color,
      price: { min: priceRange[0], max: priceRange[1] },
      sort: sortType.toUpperCase(),
    },
    queryKey: "products",
    skip,
  });

  useEffect(() => {
    if (data) setProducts(data?.products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!products?.data.length) {
    return (
      <p className="text-center my-24 text-primary text-lg animate-bounce font-bold">
        nothing to show :(
      </p>
    );
  }

  return (
    <>
      <div
        className={`md:p-0 p-4 grid gap-4 md:gap-8 grid-cols-2 ${
          TILE_CLASSNAMES[displayCols] || TILE_CLASSNAMES["4"]
        }`}
      >
        {products?.data.map((el: Product) => (
          <Tile key={el.id} el={el} />
        ))}
      </div>
      <Pagination />
    </>
  );
};
