import { ProductDetailsPage } from "apps/commerce/types.ts";
import { JSX } from "preact";
import SaveProduct from "../../islands/SaveProduct/SaveProduct.tsx";
import Image from "apps/website/components/Image.tsx";
import MoreDetailsButton from "../../islands/MoreDetailsButton/MoreDetailsButton.tsx";
import ModalComments from "../../components/ModalComments/ModalComments.tsx";
import { ProductComments } from "../../loaders/comments/getCommentsByProductId.ts";

export interface Props {
  product: ProductDetailsPage | null;
  adDescription?: string;
  vertical?: boolean;
  animateImage?: boolean;
  highlight?: boolean;
  preload?: boolean;
  productComments?: ProductComments;
}

export type ProductAd = JSX.Element;

const ANIMATE_IMAGE = "transition-transform transform hover:scale-125";

export function ErrorFallback() {
  const product: ProductDetailsPage = {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0,
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
        url:
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/155648/vestido-rosa.jpg?v=637685625855700000",
      }],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        highPrice: 181.3,
        lowPrice: 181.3,
        offerCount: 1,
        offers: [],
      },
    },
  };

  return (
    <ProductAdSection
      product={product}
    />
  );
}

export function LoadingFallback() {
  const product: ProductDetailsPage = {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0,
    },
    product: {
      "@type": "Product",
      productID: "999",
      sku: "999",
      name: "Carregando...",
      description: "Carregando...",
    },
  };
  return (
    <ProductAdSection
      product={product}
    />
  );
}

export default function ProductAdSection({
  product,
  adDescription,
  vertical = false,
  animateImage = false,
  highlight,
  preload = false,
  productComments,
}: Props) {
  return (
    <div
      class={`p-2 flex flex-col justify-between items-center relative gap-4 my-4 m-auto w-fit border border-neutral-500 rounded-md hover:border-accent ${
        vertical ? "" : "lg:flex-row lg:min-w-[850px]"
      }`}
    >
      <div class="relative overflow-hidden">
        <Image
          class={`${
            animateImage ? ANIMATE_IMAGE : ""
          } bg-gray-100 w-[280px] h-[280px]`}
          src={product?.product.image ? product?.product.image[0].url! : ""}
          alt={product?.product.image
            ? product?.product.image[0].alternateName
            : ""}
          width={280}
          height={280}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
        />
      </div>
      <div
        class={`flex flex-col ${
          vertical
            ? ""
            : "lg:gap-4 lg:h-full lg:justify-start lg:mb-auto lg:max-w-48 lg:w-full"
        }`}
      >
        <p class="text-xl font-bold">{product?.product.name}</p>
        <p class="text-base">
          {adDescription ? adDescription : product?.product.description}
        </p>
      </div>
      <div
        class={`flex flex-col justify-center items-center ${
          vertical
            ? ""
            : "lg:h-full lg:justify-end lg:mt-auto lg:items-end lg:gap-3"
        }`}
      >
        <p class="text-lg font-bold text-accent">
          {product?.product.offers?.highPrice}
        </p>
        <div
          class={`flex flex-col gap-3 justify-center items-center ${
            vertical ? "" : "lg:flex-row"
          }`}
        >
          <MoreDetailsButton>
            <ModalComments comments={productComments?.comments ?? []} />
          </MoreDetailsButton>
          <a
            href={product?.product.url}
            class="px-6 py-2 w-fit rounded-md border-accent bg-accent border no-underline"
          >
            Comprar
          </a>
        </div>
      </div>
      {(highlight && productComments?.comments &&
        productComments?.comments?.length > 3) &&
        (
          <p class="py-2 px-4 flex items-center justify-center absolute top-5 left-5 text-xs text-white bg-cyan-600">
            Destaque
          </p>
        )}
      <SaveProduct
        buttonLabel="Salvar"
        productId={product?.product.productID ?? ""}
        productName={product?.product.name ?? ""}
        image={product?.product.image ? product?.product.image[0].url! : ""}
      />
    </div>
  );
}
