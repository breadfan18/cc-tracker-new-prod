import React, { useState } from "react";
import AWS from "aws-sdk";

export default function TestPage() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadFile = async () => {
    const S3_BUCKET = "cc-tracker";
    const REGION = "US West (N. California) us-west-1";

    AWS.config.update({
      accessKeyId: "AKIAR2TT5OLODYESQ7NQ",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      alert("File uploaded successfully.");
    });
  };

  return (
    <div className="foo">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}
