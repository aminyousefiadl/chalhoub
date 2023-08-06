import Image from "next/image";

export const Banner = () => {
  return (
    <section className="relative w-full h-[480px] mb-8">
      <Image
        className="rounded-lg"
        src="/banner_promotion.webp"
        alt="Promotion Banner"
        layout="fill"
      />
    </section>
  );
};
