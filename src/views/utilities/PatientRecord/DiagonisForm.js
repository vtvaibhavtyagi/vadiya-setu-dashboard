import { TextField, Box, IconButton, Button, Chip, Grid, Stack } from '@mui/material'
import Typography from '@mui/material/Typography';
import DragAndDropFile from './DragAndDrop';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js"

const style = {
  maxHeight: "200px",
  overflow: "auto"
}

const DiagonisForm = ({ dReportFiles, setdReportFiles, dSymtoms, setdSymtoms }) => {

  const submitdReportFiles = (acceptedFile) => {
    console.log(URL.createObjectURL(acceptedFile));
    let data = {
      fileurl: URL.createObjectURL(acceptedFile),
      fileObj: acceptedFile,
      type: acceptedFile.type == "video/mp4" ? 0 : 1,
    };
    setdReportFiles((prevFiles) => [...prevFiles, data]);
  };

  const removedReportFiles = (i) => {
    let temp = dReportFiles.filter((item, index) => i != index);
    setdReportFiles(temp);
  };

  const ondSymtoms = (e) => {
    console.log(convertToRaw(e.getCurrentContent()))
    setdSymtoms(e)
  }

  return <Box>
    <Typography variant="h5" sx={{ marginBlock: 2 }}>
      Reports
    </Typography>
    <DragAndDropFile processData={submitdReportFiles}>
      <Typography color="primary" variant="h5">
        Drag 'n' drop Report files here, or click to select files
      </Typography>
      <Typography variant="p">Note: It should be image or video </Typography>
    </DragAndDropFile>
    <Typography variant="h5" sx={{ marginBlock: 2 }}>
      Uploaded File
    </Typography>
    <Stack direction="row" spacing={1}>
      {dReportFiles.map((item, i) => (
        <Chip label={item.fileObj.name} onDelete={() => removedReportFiles(i)} />
      ))}
    </Stack>
    <Typography variant="h5" sx={{ marginBlock: 2 }}>
      Symtoms
    </Typography>
    <Editor
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
      editorState={dSymtoms}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={ondSymtoms}
    />
    {/* <Button variant="outlined" fullWidth>Save</Button> */}
  </Box>
}

export default DiagonisForm