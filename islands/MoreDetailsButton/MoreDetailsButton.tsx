import Modal from "../../components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export default function MoreDetailsButton({ children }: Props) {
  const open = useSignal(false);

  return (
    <>
      <button
        onClick={() => open.value = true}
        class="px-6 py-2 w-fit rounded-md border-accent border no-underline text-accent hover:bg-accent hover:text-black"
      >
        Mais Detalhes
      </button>
      <Modal
        open={open.value}
        onClose={() => open.value = false}
      >
        {children}
      </Modal>
    </>
  );
}
