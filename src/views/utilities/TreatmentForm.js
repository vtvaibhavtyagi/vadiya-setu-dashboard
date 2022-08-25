import { TextField, Box, IconButton, Button, Chip, Grid, Stack } from '@mui/material'
import Typography from '@mui/material/Typography';
import DragAndDropFile from './DragAndDrop';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js"


const TreatmentForm = ({ tReport, settReport, tDesc, settDesc }) => {
  const submittReportFiles = (acceptedFile) => {
    console.log(URL.createObjectURL(acceptedFile));
    let data = {
      fileurl: URL.createObjectURL(acceptedFile),
      fileObj: acceptedFile,
      type: acceptedFile.type == "video/mp4" ? 0 : 1,
    };
    settReport((prevFiles) => [...prevFiles, data]);
  };

  const removedReportFiles = (i) => {
    let temp = tReport.filter((item, index) => i != index);
    settReport(temp);
  };

  const ontDesc = (e) => {
    // console.log(convertToRaw(e.getCurrentContent()))
    settDesc(e)
  }

  return <Box>
    <Typography variant="h5" sx={{ marginBlock: 2 }}>
      Reports
    </Typography>
    <DragAndDropFile processData={submittReportFiles}>
      <Typography color="primary" variant="h5">
        Drag 'n' drop Report files here, or click to select files
      </Typography>
      <Typography variant="p">Note: It should be image or video </Typography>
    </DragAndDropFile>
    <Typography variant="h5" sx={{ marginBlock: 2 }}>
      Uploaded File
    </Typography>
    <Stack direction="row" spacing={1}>
      {tReport.map((item, i) => (
        <Chip label={item.fileObj.name} onDelete={() => removedReportFiles(i)} />
      ))}
    </Stack>
    <Typography variant="h5" sx={{ marginBlock: 2 }}>
      Description
    </Typography>
    <Editor
      editorState={tDesc}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={ontDesc}
    />
    {/* <Button variant="outlined" fullWidth>Save</Button> */}
  </Box>
}

export default TreatmentForm