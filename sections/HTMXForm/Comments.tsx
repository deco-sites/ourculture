import { AppContext } from "../../apps/site.ts";
import { ComponentProps } from "../Component.tsx";

export async function loader(_props: unknown, _req: Request, ctx: AppContext) {

    const comments = await ctx.invoke.site.loaders.comments.getCommentsByProductId({
        productId: "999"
    })

    return {
        comments: comments.comments
    }
}

export default function Comments({ comments }: ComponentProps<typeof loader>) {
    return (
        <ul>
            {comments.map(reminder => 
                <li key={reminder}>
                    {reminder}
                </li>
            )}
        </ul>
    )
}