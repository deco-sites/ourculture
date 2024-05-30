import ShowProductEvents from "../../islands/ShowProductEvents/ShowProductEvents.tsx";
import { QuantityComments } from "../../loaders/comments/getAllComments.ts";

export interface Props {
    total: QuantityComments
}

export default function TotalEvents({ total }: Props) {
    return (
        <div>
            Site saves: {total.total}
            <ShowProductEvents />
        </div>
    )
}