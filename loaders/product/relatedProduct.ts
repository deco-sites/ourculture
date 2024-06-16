import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";



const relatedProduct = async (
    _props: unknown,
    _req: Request,
    ctx: AppContext
): Promise<ProductDetailsPage | null> => {
    const response = await ctx.invoke.vtex.loaders.legacy.relatedProductsLoader({
        crossSelling: "similars",
    });

    console.log("OIEEE")
    console.log(response)
    
    if(!response) return null;

    const firstRelatedProduct = response[0];

    return {
        "@type": "ProductDetailsPage",
        product: firstRelatedProduct,
        breadcrumbList: {
            "@type": "BreadcrumbList",
            itemListElement: [],
            numberOfItems: 0
        }
    }
}

export default relatedProduct;