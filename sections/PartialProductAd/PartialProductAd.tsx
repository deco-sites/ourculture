import type { Section } from "deco/blocks/section.ts";
import ProductAdComponent from "../ProductAd/ProductAd.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  productAds: Section[];
  message: string;
  image: ImageWidget;
  buttonTitle: string;
  currentProduct?: number;
}

export function ErrorFallback(_: unknown) {
  const product = {
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0yebjaFKFNLElmRSkjxDsSLtBsIDtbfONw&s",
    title: "Roupas Indianas",
    description: "Explore nossa coleção exclusiva de roupas indianas",
    price: "",
    href: "/culturas",
  };

  return (
    <ProductAdComponent
      product={product}
    />
  );
}

export function LoadingFallback() {
  const product = {
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LsYz6T9GWTNlaee8UwtQKZjxxlmGG70xNQmZSnY9dSOGPof0s1O-2Oq8Ldn3-DFu1NI&usqp=CAU",
    title: "Loading...",
    description: "Loading...",
    price: "",
  };

  return (
    <ProductAdComponent
      product={product}
    />
  );
}

export default function PartialProductAd({
  productAds = [],
  message,
  image,
  buttonTitle,
  currentProduct = 0,
}: Props) {
  const productComponent = productAds[currentProduct];

  return (
    <div class="flex p-4 gap-4">
      <productComponent.Component {...productComponent.props} />

      <div class="flex flex-col gap-4">
        <p>
          {message}
        </p>
        <img
          class="transition-transform transform hover:scale-125"
          src={image}
          width={30}
          height={30}
        >
        </img>
        <button
          {...usePartialSection({
            props: {
              currentProduct: (currentProduct + 1) > productAds.length
                ? 0
                : currentProduct + 1,
            },
          })}
          class="px-5 py-2 bg-accent pointer text-xl font-bold w-full"
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}
