import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";

const EditProfilePhoto = () => {
  const [editor, setEditor] = useState(null);
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const [foo, setFoo] = useState(null);
  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const profilePhotoURL = canvas.toDataURL();
      setFoo(profilePhotoURL);
      // Send profilePhotoURL to your server for saving
      // Or use it as you need
    }
  };

  return (
    <>
      <div>
        <h2>Edit Profile Photo</h2>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        {image && (
          <div>
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
              image={image}
              width={250}
              height={250}
              // border={50}
              // color={[255, 255, 255, 0.6]} // RGBA
              scale={scale}
              rotate={0}
            />
            <input
              type="range"
              value={scale}
              min="1"
              max="2"
              step="0.01"
              onChange={handleScaleChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
      <img
        src={foo}
        alt=""
        style={{
          height: "12rem",
          width: "12rem",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default EditProfilePhoto;
