import { useId } from "../../sdk/useId.ts";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

interface Props {
  onClose?: () => void;
  open?: boolean;
  class?: string;
  style?: string;
  children?: ComponentChildren;
  loading?: "eager" | "lazy";
}

function Modal(props: Props) {
  const {
    children,
    open,
    onClose,
  } = props;
  const id = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  return (
    <>
      <input
        id={id}
        checked={open}
        type="checkbox"
        class="modal-toggle"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
      />
      <div class="modal">
        {children}
        <label class="modal-backdrop" for={id}>Close</label>
      </div>
    </>
  );
}

export default Modal;
