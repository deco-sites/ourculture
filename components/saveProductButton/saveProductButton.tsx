import { usePartialSection } from "deco/hooks/usePartialSection.ts";


export interface Props {
    title: string
    open: boolean
}

export default function SaveProductButton({
    title,
    open = false
}: Props) {

    return (
        <>
            <button 
                class="rounded-full p-2 flex items-center justify-center absolute top-5 right-5 text-xs text-white bg-accent"
                {...usePartialSection({
                    props: {
                        open: true,
                    },
                })}
            >
                {title}
            </button>
            <input
                id="modal-save-product"
                checked={open}
                type="checkbox"
                class="modal-toggle"
                {...usePartialSection({
                    props: {
                        open: false,
                    },
                })}
            />
            <div class="modal">
                <div class="w-12 h-12">
                    Teste
                </div>
                <label 
                    class="modal-backdrop" 
                    for="modal-save-product"
                    {...usePartialSection({
                        props: {
                            open: false,
                        },
                    })}
                >
                    Close
                </label>
            </div>
        </>
    )
}