export interface QuantityComments {
    total: number
}

const getAllComments = async (
    _props: unknown,
    _req: Request,
    _ctx: unknown
): Promise<QuantityComments> => {
    const response = await fetch(`https://camp-api.deco.cx/events`, {
            headers: {
                "x-api-key": "ourculture",
            },
        })
        .then(res => res.json());

    return {
        total: response.total
    }
}

export default getAllComments;