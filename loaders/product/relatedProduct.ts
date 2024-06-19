import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";

const relatedProduct = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<ProductDetailsPage | null> => {
  const url = new URL(req.url);
  const slug = url.pathname;

  const response = await ctx.invoke.vtex.loaders.legacy.relatedProductsLoader({
    slug,
    crossSelling: "whosawalsosaw",
  });

  if (!response) return null;

  const firstRelatedProduct = response[0];

  return {
    "@type": "ProductDetailsPage",
    product: firstRelatedProduct,
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0,
    },
  };
};

export default relatedProduct;
