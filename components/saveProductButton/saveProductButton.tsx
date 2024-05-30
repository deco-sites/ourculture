import ProductAd from "../../sections/ProductAd/ProductAd.tsx";
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
                <ProductAd 
                    product={{
                        imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0yebjaFKFNLElmRSkjxDsSLtBsIDtbfONw&s",
                        title: "Roupas Indianas",
                        description: "Explore nossa coleção exclusiva de roupas indianas",
                        price: "R$ 299,00",
                        href: "/culturas",
                    }}
                />
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