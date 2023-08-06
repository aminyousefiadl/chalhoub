import { Suspense } from "react";
import { PRODUCTS } from "@/queries";
import { ConfigContextProvider } from "@/context/information.context";
import { TileWithSort, Filter, Banner, Sort } from "@/components";
import { Loading } from "@/components/Loading";
import { getClient } from "@/lib/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getClient().query({
    query: PRODUCTS,
    variables: {
      variables: {
        page: 1,
        limit: 10,
        color: "",
        price: { min: 100, max: 10000 },
        sort: "RECOMMENDED",
      },
    },
  });

  const { products } = data?.data || {};

  return (
    <ConfigContextProvider initialProducts={products}>
      <main className="min-h-screen relative md:p-8">
        <Banner />
        <div className="flex relative justify-between">
          <Filter />
          <div className="flex-1 md:pl-8">
            <Sort />
            <Suspense fallback={<Loading />}>
              <TileWithSort />
            </Suspense>
          </div>
        </div>
      </main>
    </ConfigContextProvider>
  );
}
