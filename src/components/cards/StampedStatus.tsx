import { setColorForCardStatus } from "../../helpers";

export default function StampedStatus({ status }: { status: string }) {
  return (
    <div
      className="stamp"
      style={{
        background: setColorForCardStatus("cardCard", status),
        color: status === "closed" ? "#ff0000" : "orangered",
      }}
    >
      {status}
    </div>
  );
}
