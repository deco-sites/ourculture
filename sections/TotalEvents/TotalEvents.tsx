import ShowProductEvents from "../../islands/ShowProductEvents/ShowProductEvents.tsx";
import { QuantityComments } from "../../loaders/comments/getAllComments.ts";

export interface Props {
  total: QuantityComments;
}

export default function TotalEvents({ total }: Props) {
  return (
    <div class="flex flex-col gap-4 justify-center mt-12">
      <h1 class="font-bold text-4xl text-center">
        Site saves: {total.total}
      </h1>
      <ShowProductEvents />
    </div>
  );
}
