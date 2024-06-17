import type { Section } from "deco/blocks/section.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  productAds: Section[];
  message: string;
  image: ImageWidget;
  buttonTitle: string;
  currentProduct?: number;
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
    <div class="flex p-4 flex-col w-fit sm:flex-row mx-auto">
      <productComponent.Component {...productComponent.props} />

      <div class="flex flex-col gap-2 mx-auto">
        <p>
          {message}
        </p>
        <img
          class="transition-transform transform hover:scale-125 mx-auto"
          src={image}
          width={30}
          height={30}
        >
        </img>
        <button
          {...usePartialSection({
            props: {
              currentProduct: (currentProduct + 1) === productAds.length
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
