import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DragAndDropFile(props) {
  //const [fileImg, setFileImg] = useState(null);
  const styles = {
    drag: {
      display: "flex",
      border: "2px dashed black",
      padding: "5em",
      textAlign: "center",
      flexDirection: "column",
    },
    dragUploaded: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      border: "2px dashed #5cb85c",
      padding: "5em",
      textAlign: "center",
    },
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((item) => {
      props.processData(item);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept } = useDropzone({
    onDrop,
    accept: ".jpg, .mp4, .png",
    maxFiles: 2
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div style={styles.drag}>
          <p>Drop the files here ...</p>
        </div>
      ) : acceptedFiles[0] ? (
        <div style={styles.dragUploaded}>
          <p>File Uploaded</p>
          {acceptedFiles.map((item) => {
            return <p className="text-success">{item.path}</p>;
          })}
        </div>
      ) : (
        <div style={styles.drag}>{props.children}</div>
      )}
    </div>
  );
}

export default DragAndDropFile;
