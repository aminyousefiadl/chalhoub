"use client";

import { ConfigStateType, Products, SortOptions } from "@/types";
import React, { createContext, useCallback, useContext, useState } from "react";

const initialState: ConfigStateType = {
  priceRange: [0, 10000],
  color: "",
  limit: "All",
  displayCols: "4",
  page: 1,
  sortType: SortOptions.Recommended,
};

export const ConfigContext = createContext<{
  information: ConfigStateType;
  setInformation: (data: Partial<ConfigStateType>) => void;
  products?: Products;
  setProducts: React.Dispatch<React.SetStateAction<Products | undefined>>;
  skip?: boolean;
}>({
  information: initialState,
  setInformation: (pre) => initialState,
  setProducts: () => {},
  skip: true,
});

export const ConfigContextProvider = ({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts?: Products;
}) => {
  const [information, setBasicInformation] = useState(initialState);
  const [products, setProducts] = useState(initialProducts);
  const [skip, setSkip] = useState(true);

  const setInformation = useCallback(
    (data: Partial<ConfigStateType>) => {
      setBasicInformation({ ...information, ...data });
      if (skip) setSkip((pre) => !pre);
    },
    [information, skip]
  );

  return (
    <ConfigContext.Provider
      value={{ information, setInformation, products, setProducts, skip }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigContextProvider");
  }

  return context;
};
