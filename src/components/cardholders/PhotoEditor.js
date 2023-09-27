import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";

const PhotoEditor = ({ image, handleSave }) => {
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [isImgSaved, setIsImgSaved] = useState(false);

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const fooGoo = () => {
    setIsImgSaved(true);
  };

  // const handleSave = () => {
  //   if (editor) {
  //     const canvas = editor.getImageScaledToCanvas();
  //     const profilePhotoURL = canvas.toDataURL();
  //     setFoo(profilePhotoURL);

  //     uploadString(storageRef, profilePhotoURL, "data_url").then((snapshot) => {
  //       console.log("Uploaded a data_url string!");
  //     });
  //     // Send profilePhotoURL to your server for saving
  //     // Or use it as you need
  //   }
  // };

  return (
    <>
      {isImgSaved ? (
        <img
          src="https://i.imgur.com/o95dgxH.png"
          alt=""
          style={{
            height: "12rem",
            width: "12rem",
            borderRadius: "50%",
          }}
        />
      ) : (
        <div>
          <AvatarEditor
            ref={(ref) => setEditor(ref)}
            image={image}
            width={150}
            height={150}
            borderRadius={120}
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
          <button onClick={() => fooGoo()}>Save</button>
        </div>
      )}
    </>
  );
};

export default PhotoEditor;
