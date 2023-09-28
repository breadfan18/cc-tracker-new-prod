import React from "react";
import { TbPhotoEdit } from "react-icons/tb";

export default function PhotoEditButton({ onChange }) {
  return (
    <div className="image-upload">
      <label for="file-input">
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
