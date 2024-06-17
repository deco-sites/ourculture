export interface Props {
  productId: string;
}

export interface ProductComments {
  product: number;
  comments: string[];
}

const getCommentsByProductId = async (
  props: Props,
  _req: Request,
  _ctx: unknown,
): Promise<ProductComments> => {
  const response: ProductComments = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    {
      headers: {
        "x-api-key": "ourculture",
      },
    },
  )
    .then((res) => res.json());

  const filteredComments = response.comments.filter((comment) => {
    return comment.length >= 5;
  });

  return {
    product: response.product,
    comments: filteredComments,
  };
};

export default getCommentsByProductId;
