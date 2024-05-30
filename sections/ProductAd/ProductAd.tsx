import { ProductDetailsPage } from "apps/commerce/types.ts";
import { JSX } from "preact";
import SaveProductButton from "../../islands/SaveProductButton/SaveProductButton.tsx";
import { AppContext } from "../../apps/site.ts"
import type { SectionProps } from "deco/mod.ts";

export interface Props {
  product: ProductDetailsPage | null;
  adDescription?: string;
  vertical?: boolean;
  animateImage?: boolean;
  highlight?: boolean;
}

export type ProductAd = JSX.Element;

const ANIMATE_IMAGE = "transition-transform transform hover:scale-125"

export async function loader(props: Props, _req: Request, ctx: AppContext) {
  if(props.highlight) {
    const response = await ctx.invoke.site.loaders.comments.getCommentsByProductId({
      productId: props.product?.product.productID
    })

    return {
      ...props,
      highlight: response.product > 3.
    }
  }

  return {
    ...props,
  }
}

export default function ProductAdSection({ 
  product, 
  adDescription,
  vertical = false,
  animateImage = false,
  highlight
}: SectionProps<typeof loader>) {
  return (
    <div class={`p-2 flex flex-col justify-center items-center relative gap-4 w-fit border border-neutral-500 rounded-md hover:border-accent ${vertical ? '' : "lg:flex-row"}`}>
      <div class="relative overflow-hidden">
        <img
          class={`${animateImage ? ANIMATE_IMAGE : ''}`}
          width={280}
          height={420}
          src={product?.product.image ? product?.product.image[0].url : ""}
          decoding="async"
          loading="lazy"
        />
      </div>
      <div class={`flex flex-col gap-3 ${vertical ? '' : "lg:gap-4 lg:h-full lg:justify-start lg:mb-auto"}`}>
        <p class="text-xl font-bold">{product?.product.name}</p>
        <p class="text-base">
          {adDescription ? adDescription : product?.product.description}
        </p>
      </div>
      <div class={`flex flex-col gap-3 justify-center items-center ${vertical ? '' : "lg:h-full lg:justify-end lg:mt-auto lg:items-end"}`}>
        <p class="text-lg font-bold text-accent">{product?.product.offers?.highPrice}</p>
        <div class={`flex flex-col gap-3 justify-center items-center ${vertical ? '' : "lg:flex-row"}`}>
          <a
            href={product?.product.url}
            class="px-6 py-2 w-fit rounded-md border-accent border no-underline text-accent hover:bg-accent hover:text-black"
          >
            Mais Detalhes
          </a>
          <a class="px-6 py-2 w-fit rounded-md border-accent bg-accent border no-underline">
            Comprar
          </a>
        </div>
      </div>
      {highlight &&
        <p 
            class="py-2 px-4 flex items-center justify-center absolute top-5 left-5 text-xs text-white bg-cyan-600"
        >
            Destaque
        </p>
      }
      <SaveProductButton title="Salvar" productId={product?.product.productID ?? ""}/>
    </div>
  );
}
