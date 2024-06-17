import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";

interface ProductComments {
  product: number;
  comments: string[];
}

export default function ShowProductEvents() {
  const [inputValue, setInputValue] = useState("");
  const totalVotes = useSignal<ProductComments | null>(null);

  useEffect(() => {
    const interval = setTimeout(async () => {
      if (inputValue) {
        const response: ProductComments = await invoke.site.loaders.comments
          .getCommentsByProductId({
            productId: inputValue,
          });

        totalVotes.value = response;
      }
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [inputValue]);

  return (
    <div class="flex flex-col gap-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        class="block outline-accent rounded border w-full max-w-48 mx-auto px-4 py-2"
      />
      {totalVotes &&
        (
          <>
            <p class="font-bold text-center text-2xl">
              Produto: {inputValue}
            </p>
            <p class="font-bold text-center text-2xl">
              Total salvos: {totalVotes.value?.product}
            </p>
            {totalVotes.value?.comments && (
              <>
                <p class="font-bold text-center text-2xl">
                  Comentários:
                </p>
                <ul class="flex flex-col justify-center items-center list-disc">
                  {totalVotes.value?.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
    </div>
  );
}
