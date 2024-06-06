import Modal from "../../components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import { useRef } from 'preact/hooks'
import toast, { Toaster } from 'npm:react-hot-toast@2.4.1';

export interface Props {
    title: string
    productId: string
}

export default function SaveProductButton({
    title,
    productId
}: Props) {
    const open = useSignal(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleSaveComment = async () => {
        if(textAreaRef.current?.value) {
            await invoke.site.actions.comments.postComments({
                productId: productId,
                comment: textAreaRef.current?.value
            })

            toast('Deu certo.')
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
                        <Toaster />
                    </div>
                </div>                
            </Modal>
        </>
    )
}