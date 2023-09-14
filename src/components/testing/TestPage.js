import React, { useState, useEffect } from "react";
import { storage } from "../../tools/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { uid } from "uid";
import { get } from "lodash";

export default function TestPage() {
  const [imgUpload, setImgUpload] = useState(null);
  const [imgList, setImgList] = useState([]);
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) =>
          setImgList((prev) => [...prev, url])
        );
      });
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgUpload(file);
  };

  const uuid = uid();

  const uploadFile = async () => {
    if (imgUpload === null) return;

    const imgRef = ref(storage, `images/${imgUpload.name}${uuid}`);
    uploadBytes(imgRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) =>
        setImgList((prev) => [...prev, url])
      );
    });
  };

  return (
    <div className="foo">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
        {/* {imgList.map((img) => (
          <img
            src={img}
            alt="foo"
            style={{ height: "5rem", width: "5rem" }}
          ></img>
        ))} */}
      </div>
    </div>
  );
}
/* 
When user uploads image, 
- get the url from firebase, and 


*/
