import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TextField, Box, Button, Chip, Grid, Stack, Card } from '@mui/material'
import TreatmentForm from './TreatmentForm';
import DiagonisForm from './DiagonisForm';
import DrugsForm from "./DrugsForm";
import { convertToRaw } from "draft-js"
import { Web3StorageApiPut, Web3StorageApiGet } from "api/we3storageapi";
import health from 'api/health';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function CustomizedAccordions() {
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [expanded, setExpanded] = React.useState('panel1');
  const [dReportFiles, setdReportFiles] = React.useState([]);
  const [dSymtoms, setdSymtoms] = React.useState(null)
  const [tReport, settReport] = React.useState([]);
  const [tDesc, settDesc] = React.useState(null)
  const [drugsName, setDrugsName] = React.useState(null)
  const [drugsReport, setDrugsReport] = React.useState([])


  const getDraftsJSONForEditor = (e) => {
    if (e) {
      console.log(e.getCurrentContent())
      return convertToRaw(e.getCurrentContent())
    }
    return null
  }

  React.useEffect(() => {
    async function getRecord(){
      let response =  await health.get(`/doctor/patient/PYm3D-Q4kf`)
      response = await response
    }
    
  },[])

  const formatRecord = async () => {
    try {
      let data = {
        pid: "PYm3D-Q4kf",
        name,
        desc,
        diagonisReport: await Promise.all(dReportFiles.map(async (item) => {
          let cid = await Web3StorageApiPut([item.fileObj])
          return cid
        })),
        treatmentReport: await Promise.all(tReport.map(async (item) => {
          let cid = await Web3StorageApiPut([item.fileObj])
          return cid
        })),
        drugsReport: await Promise.all(drugsReport.map(async (item) => {
          let cid = await Web3StorageApiPut([item.fileObj])
          return cid
        })),
        diagonis: getDraftsJSONForEditor(dSymtoms),
        treatMent: getDraftsJSONForEditor(tDesc),
        drugsName: getDraftsJSONForEditor(drugsName)
      }
      let respons = await health.post("/doctor/patient/record", data, {
        headers:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiRFJtTzN6azFMdiIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2NjE0MjYxNzgsImV4cCI6MTY2MTQyOTc3OH0.2ZW_uPFMNdMKvNRYnEWjvautst1A2jHTZOq0wviJQW8",
          "did":"DRmO3zk1Lv"
        }
      });
      respons = await respons.data;
      console.log(respons)
    } catch (error) {
      console.log(error.stack)
      console.log(`Error while adding record: ${error}`)
    }
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Typography sx={{ mb: 2 }} variant="h2" component="div">
        Add Disease
      </Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>General Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={2}>
            <TextField placeholder='Name' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField placeholder='Description' multiline value={desc} rows={5} fullWidth onChange={(e) => setDesc(e.target.value)} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Diagnosis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <DiagonisForm dReportFiles={dReportFiles} setdReportFiles={setdReportFiles} dSymtoms={dSymtoms} setdSymtoms={setdSymtoms} />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Treatment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreatmentForm tReport={tReport} settReport={settReport} tDesc={tDesc} settDesc={settDesc} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Drugs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DrugsForm dReport={drugsReport} setDreport={setDrugsReport} drugsName={drugsName} setDrugsName={setDrugsName} />
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" fullWidth sx={{marginBlock:1}} onClick={() => formatRecord()}>Save</Button>
    </div>
  );
}
