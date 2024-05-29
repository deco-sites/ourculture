import type { ImageWidget } from "apps/admin/widgets.ts";
import { JSX } from "preact";

export interface Props {
  product: Product;
  adDescription?: string;
  vertical?: boolean;
  animateImage?: boolean;
}

interface Product {
  title: string;
  description?: string;
  price: string;
  imageSrc: ImageWidget;
  href?: string;
}

export type ProductAd = JSX.Element;

const ANIMATE_IMAGE = "transition-transform transform hover:scale-125"

export default function ProductAdSection({ 
  product, 
  adDescription,
  vertical = false,
  animateImage = false
}: Props) {
  return (
    <div class={`p-2 flex flex-col justify-center items-center relative gap-4 w-fit border border-neutral-500 rounded-md hover:border-accent ${vertical ? '' : "lg:flex-row"}`}>
      <div class="relative overflow-hidden">
        <img
          class={`${animateImage ? ANIMATE_IMAGE : ''}`}
          width={280}
          height={420}
          src={product.imageSrc}
          decoding="async"
          loading="lazy"
        />
      </div>
      <div class={`flex flex-col gap-3 ${vertical ? '' : "lg:gap-4 lg:h-full lg:justify-start lg:mb-auto"}`}>
        <p class="text-xl font-bold">{product.title}</p>
        <p class="text-base">
          {adDescription ? adDescription : product.description}
        </p>
      </div>
      <div class={`flex flex-col gap-3 justify-center items-center ${vertical ? '' : "lg:h-full lg:justify-end lg:mt-auto lg:items-end"}`}>
        <p class="text-lg font-bold text-accent">{product.price}</p>
        <div class={`flex flex-col gap-3 justify-center items-center ${vertical ? '' : "lg:flex-row"}`}>
          <a
            href={product.href}
            class="px-6 py-2 w-fit rounded-md border-accent border no-underline text-accent hover:bg-accent hover:text-black"
          >
            Mais Detalhes
          </a>
          <a class="px-6 py-2 w-fit rounded-md border-accent bg-accent border no-underline">
            Comprar
          </a>
        </div>
      </div>
      <button class="rounded-full p-2 flex items-center justify-center absolute top-5 right-5 text-xs text-white bg-accent">
        Salvar
      </button>
    </div>
  );
}
