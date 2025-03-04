import { TbPhotoEdit } from "react-icons/tb";

export default function PhotoEditButton({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="image-upload">
      <label htmlFor="file-input">
        <TbPhotoEdit className="editPhotoIcon" />
      </label>
      <input
        id="file-input"
        type="file"
        title=" "
        onChange={onChange}
        name="imgFile"
        className="custom-file-input"
      />
    </div>
  );
}
