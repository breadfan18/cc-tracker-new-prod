import { Button } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";

type DeleteButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disableBtn: boolean;
  showAsRectangle?: boolean;
};
export function DeleteButton({
  onClick,
  disableBtn,
  showAsRectangle,
}: DeleteButtonProps) {
  return (
    <Button
      variant="danger"
      onClick={onClick}
      className={!showAsRectangle ? "rounded-circle" : ""}
      disabled={disableBtn}
    >
      <BsTrash3 />
    </Button>
  );
}
