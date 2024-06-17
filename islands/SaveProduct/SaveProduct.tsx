import Modal from "../../components/ui/Modal.tsx";
import { useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import { useRef } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import Toast from "../../components/daisy/Toast.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";


export interface Props {
    productName: string
    image: string
    buttonLabel: string
    productId: string
}

export default function SaveProduct({
    productName,
    image,
    buttonLabel,
    productId
}: Props) {
    const open = useSignal(false);
    const dispatchToast = useSignal(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useSignalEffect(() => {
        if(dispatchToast.value) {
            setTimeout(() => {
                dispatchToast.value = false
            }, 3000)
        }
    })

    const handleSaveComment = async () => {
        if(textAreaRef.current?.value) {
            await invoke.site.actions.comments.postComments({
                productId: productId,
                comment: textAreaRef.current?.value
            })

            dispatchToast.value = true;
            textAreaRef.current.value = "";
            sendEvent({
                name: "post_score",
                params: {
                    score: 1,
                },
            })
        }
    }

    return (
        <>
            <button 
                class="rounded-full p-2 flex items-center justify-center absolute top-5 right-5 text-xs text-white bg-accent"
                onClick={() => open.value = true}
            >
                {buttonLabel}
            </button>
            <Modal
                open={open.value}
                onClose={() => open.value = false}
            >
                <div class="absolute flex flex-col p-6 bg-white rounded-lg gap-4">
                    <div class="flex gap-4">
                        <Image
                            width={280}
                            height={280}
                            src={image}
                            alt={productName}
                            loading="lazy"
                        />
                        <div class="flex flex-col gap-3">
                            <h2 class="font-bold text-2xl text-accent">
                                {productName}
                            </h2>
                            <p>
                                Observação:
                            </p>
                            <textarea
                                class="outline-accent border border-black flex-1 rounded p-4"
                                ref={textAreaRef} 
                            />
                        </div>
                    </div>
                    <div class="flex w-100 justify-end gap-4">
                        <button 
                            onClick={() => open.value = false}
                            class="px-4 py-2 rounded-md border border-accent text-accent text-base cursor-pointer hover:bg-accent hover:text-black"
                        >
                            Cancelar
                        </button>
                        <button 
                            class="px-4 py-2 rounded-md bg-accent text-base cursor-pointer" 
                            onClick={handleSaveComment}
                        >
                            Publicar
                        </button>
                    </div>
                </div>                
            </Modal>
            {dispatchToast.value &&
                <Toast 
                    message="Seu produto foi salvo!"
                    verticalPosition="toast-top"
                    horizontalPosition="toast-center"
                />
            }
        </>
    )
}