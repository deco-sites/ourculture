export interface Props {
    productId: string,
    comment: string
}

const postComments = async (
    props: Props,
    _req: Request,
    _ctx: unknown
) => {
    try {
        await fetch('https://camp-api.deco.cx/event', {
            method: "POST",
            headers: {
                "x-api-key": "ourculture",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(props)
        });
    } catch (error) {
        throw new Error(error)
    }
}

export default postComments;