import React, { useState } from "react";

export default function TestPage() {
  const [file, setFile] = useState();

  const onFileChange = (event) => {
    // Updating the state
    setFile({ file: event.target.files[0] });
  };

  const onFileUpload = async () => {
    // Client ID
    // const clientId = "dfcd98b52a00d5e",
    //   auth = "Client-ID " + clientId;

    // // Creating an object of formData
    // const formData = new FormData();

    // // Adding our image to formData
    // formData.append("file", file);

    // console.log(formData);

    // // Making the post request
    // await fetch("https://api.imgur.com/3/image/", {
    //   // API Endpoint
    //   method: "POST", // HTTP Method
    //   body: formData, // Data to be sent
    //   headers: {
    //     // Setting header
    //     Authorization: "Bearer c04e54608aacc45274b28ffac9c465fece504f06",
    //     Accept: "application/json",
    //   },
    // })
    //   .then((res) => alert("image uploaded") && console.log(res)) // Handling success
    //   .catch((err) => alert("Failed") && console.log(err)); // Handling error

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 78275d66f39bdbafd1fd58b46ffe7728e0227af4"
    );
    myHeaders.append(
      "Cookie",
      "IMGURSESSION=e75437027621d0bccedd945efde64dc7; _nc=1"
    );

    var formdata = new FormData();
    formdata.append("image", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  console.log(file);

  return (
    <>
      <h2>TEST PAGE</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </>
  );
}
