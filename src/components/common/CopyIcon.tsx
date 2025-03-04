import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";

export default function CopyIcon({ dataToCopy }: { dataToCopy: string }) {
  const copyFileNameToClipboard = (dataToCopy: string) => {
    navigator.clipboard
      .writeText(dataToCopy)
      .then(() => toast.info("Data copied to clipboard"))
      .catch((err) => toast.error("Error copying the data"));
  };
  return (
    <IoCopyOutline
      className="copyIcon"
      onClick={() => copyFileNameToClipboard(dataToCopy)}
    />
  );
}
