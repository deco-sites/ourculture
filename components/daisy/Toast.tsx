export interface Props {
  message: string;
  verticalPosition?: "toast-top" | "toast-middle" | "toast-bottom";
  horizontalPosition?: "toast-start" | "toast-center" | "toast-end";
}

export default function Toast(props: Props) {
  const { message, verticalPosition, horizontalPosition } = props;

  return (
    <div className={`toast ${verticalPosition} ${horizontalPosition} z-[9999]`}>
      <div className="alert alert-info bg-accent">
        <span>{message}</span>
      </div>
    </div>
  );
}
