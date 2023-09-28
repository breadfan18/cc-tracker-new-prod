import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";

const PhotoEditor = ({ image, setEditor }) => {
  const [scale, setScale] = useState(1);

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  return (
    <>
      <div className="photoEditContainer">
        <AvatarEditor
          ref={(ref) => setEditor(ref)}
          image={image}
          width={200}
          height={200}
          borderRadius={120}
          // border={50}
          // color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={0}
        />
        <div className="photoEditZoomer">
          <label htmlFor="photoZoom">Zoom</label>
          <input
            name="photoZoom"
            type="range"
            value={scale}
            min="1"
            max="2"
            step="0.01"
            onChange={handleScaleChange}
          />
        </div>
      </div>
    </>
  );
};

export default PhotoEditor;
