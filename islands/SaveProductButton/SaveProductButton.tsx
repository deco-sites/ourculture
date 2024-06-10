import Modal from "../../components/ui/Modal.tsx";
import { useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import { useRef } from "preact/hooks";
export interface Props {
    title: string
    productId: string
}

export default function SaveProductButton({
    title,
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
        }
    }

    return (
        <>
            <button 
                class="rounded-full p-2 flex items-center justify-center absolute top-5 right-5 text-xs text-white bg-accent"
                onClick={() => open.value = true}
            >
                {title}
            </button>
            <Modal
                open={open.value}
                onClose={() => open.value = false}
            >
                <div class="flex flex-col p-6">
                    <div class="flex gap-4">
                        <img
                            width={280}
                            height={420}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0yebjaFKFNLElmRSkjxDsSLtBsIDtbfONw&s"
                            decoding="async"
                            loading="lazy"
                        />
                        <div class="flex flex-col gap-3">
                            <h2>
                                Titulo
                            </h2>
                            <p>
                                Descricao
                            </p>
                            <textarea ref={textAreaRef} />
                        </div>
                    </div>
                    <div>
                        <button>
                            Cancelar
                        </button>
                        <button onClick={handleSaveComment}>
                            Publicar
                        </button>
                    </div>
                </div>                
            </Modal>
            {dispatchToast.value &&
                <div class="toast toast-top toast-center z-[9999]">
                    <div class="alert alert-success">
                        <span>Deu muito certo!</span>
                    </div>
                </div>
            }
        </>
    )
}