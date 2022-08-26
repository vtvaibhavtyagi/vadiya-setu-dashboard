import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { TextField, Box, Button, Chip, Grid, Stack, Card } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TreatmentForm from "./TreatmentForm";
import DiagonisForm from "./DiagonisForm";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [dReportFiles, setdReportFiles] = React.useState([]);
  const [dSymtoms, setdSymtoms] = React.useState(null);
  const [tReport, settReport] = React.useState([]);
  const [tDesc, settDesc] = React.useState(null);
  const [drugsName, setDrugName] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
        Add Disease
      </Typography>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>General Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={2}>
            <TextField placeholder="Name" fullWidth />
            <TextField placeholder="Description" multiline rows={5} fullWidth />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Diagnosis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Report</TableCell>
                    <TableCell align="right">Symtoms</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      12/12/22
                    </TableCell>
                    <TableCell align="right">jk.pdf</TableCell>
                    <TableCell align="right">Pain</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="outlined" fullWidth>
              Add
            </Button>
            <DiagonisForm
              dReportFiles={dReportFiles}
              setdReportFiles={setdReportFiles}
              dSymtoms={dSymtoms}
              setdSymtoms={setdSymtoms}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Treatment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    12/12/22
                  </TableCell>
                  <TableCell align="right">jk.pdf</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" fullWidth>
            Add
          </Button>
          <TreatmentForm
            tReport={tReport}
            settReport={settReport}
            tDesc={tDesc}
            settDesc={settDesc}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Drugs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Mariuna
                  </TableCell>
                  <TableCell align="right">12/12/22</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" fullWidth>
            Add
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
