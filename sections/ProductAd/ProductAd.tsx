import { ProductDetailsPage } from "apps/commerce/types.ts";
import { JSX } from "preact";
import SaveProductButton from "../../islands/SaveProductButton/SaveProductButton.tsx";
import { AppContext } from "../../apps/site.ts"
import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  product: ProductDetailsPage | null;
  adDescription?: string;
  vertical?: boolean;
  animateImage?: boolean;
  highlight?: boolean;
  preload?: boolean;
}

export type ProductAd = JSX.Element;

const ANIMATE_IMAGE = "transition-transform transform hover:scale-125"

export function ErrorFallback() {
  const product: ProductDetailsPage = {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0
    },
    product: {
      "@type": "Product",
      productID: "426",
      sku: "426",
      name: "Vestido Rosa PP",
      description: "O Melhor Vestido Rosa",
      url: "/vestido-rosa/p?skuId=426",
      image: [{
        "@type": "ImageObject",
        url: "https://bravtexfashionstore.vtexassets.com/arquivos/ids/155648/vestido-rosa.jpg?v=637685625855700000"
      }],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        highPrice: 181.3,
        lowPrice: 181.3,
        offerCount: 1,
        offers: []
      }
    }
  }

  return (
    <ProductAdSection
      product={product}
    />
  );
}

// deno-lint-ignore no-explicit-any
export function LoadingFallback() {
  const product: ProductDetailsPage = {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0
    },
    product: {
      "@type": "Product",
      productID: "999",
      sku: "999",
      name: "Carregando...",
      description: "Carregando...",
    }
  }
  return (
    <ProductAdSection
      product={product}
    />
  );
}

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
  highlight,
  preload = false
}: SectionProps<typeof loader>) {
  return (
    <div class={`p-2 flex flex-col justify-between items-center relative gap-4 w-fit border border-neutral-500 rounded-md hover:border-accent ${vertical ? '' : "lg:flex-row lg:min-w-[850px]"}`}>
      <div class="relative overflow-hidden">
        <Image
          class={`${animateImage ? ANIMATE_IMAGE : ''} bg-gray-100 w-[280px] h-[280px]`}
          src={product?.product.image ? product?.product.image[0].url! : ""}
          alt={product?.product.image ? product?.product.image[0].alternateName : ""}
          width={280}
          height={280}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
        />
      </div>
      <div class={`flex flex-col gap-3 ${vertical ? '' : "lg:gap-4 lg:h-full lg:justify-start lg:mb-auto lg:max-w-48 lg:w-full"}`}>
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
