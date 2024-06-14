// import { ProductDetailsPage } from "apps/commerce/types.ts";
// import { invoke } from "../../runtime.ts";
import { AppContext } from "../../apps/site.ts"


const relatedProduct = (
    _props: unknown,
    _req: Request,
    _ctx: AppContext
) => {
    // await ctx.invoke.vtex.loaders.legacy.relatedProductsLoader()
    return null

    // const relatedProducts = await invoke.vtex.loaders.legacy.relatedProductsLoader({
    //     crossSelling: "whosawalsosaw",
    //     slug: "casaco-feminino-savana/p?skuId=291"
    // });

    // if(!relatedProducts) {
    //     return null;
    // }

    // const firstRelatedProduct = relatedProducts[0];

    // return {
    //     "@type": "ProductDetailsPage",
    //     product: firstRelatedProduct,
    //     breadcrumbList: {
    //         "@type": "BreadcrumbList",
    //         itemListElement: [],
    //         numberOfItems: 0
    //     }
    // }

}

export default relatedProduct;