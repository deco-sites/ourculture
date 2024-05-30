import { useState, useEffect } from 'preact/hooks'
import { useSignal } from "@preact/signals"
import { invoke } from "../../runtime.ts"

interface ProductComments {
    product: number
    comments: string[]
}

export default function ShowProductEvents() {
    const [inputValue, setInputValue] = useState("");
    const totalVotes = useSignal<ProductComments | null>(null);

    useEffect(() => {
        const interval = setTimeout(async () => {
            if(inputValue) {
                const response: ProductComments = await invoke.site.loaders.comments.getCommentsByProductId({
                    productId: inputValue
                });
    
                totalVotes.value = response;
            }

        }, 1000);

        return () => {
            clearTimeout(interval);
        }
    }, [inputValue]);

    return (
        <div>
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {totalVotes &&
                <>
                    <p>
                        Product: {inputValue}
                    </p>
                    {totalVotes.value?.comments.map(comment =>
                        <p>{comment}</p>
                    )}
                    <p>
                        Total: {totalVotes.value?.product} votes
                    </p>
                </>
            }
        </div>
    )
}