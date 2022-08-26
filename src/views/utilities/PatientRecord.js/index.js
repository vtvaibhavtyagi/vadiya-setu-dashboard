import PropTypes from "prop-types";
import _ from "lodash";

// material-ui
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  Dialog,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// project imports
import { useNavigate } from "react-router";
import MainCard from "ui-component/cards/MainCard";
import { useState, useEffect, forwardRef } from "react";
import health from "api/health";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddDisease from "./AddDisease";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TestTable from "./TestTable";

// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4.5,
          bgcolor,
          color: dark ? "grey.800" : "#ffffff",
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// ===============================|| UI COLOR ||=============================== //

const UIColor = () => {
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const DialogVaidya = (item, index) => {
    console.log(item, index);
    return (
      <Dialog
        open={patientRecordCnt[index]}
        onClose={() => handleClose(index)}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{"Medical Record"}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBlock: 2,
            }}
          >
            <Typography variant="h3" component="div">
              Name
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1em", marginBlock: 1 }}
              component="div"
            >
              {item.name}
            </Typography>
            <Typography variant="h3" component="div">
              Desc
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1em", marginBlock: 1 }}
              component="div"
            >
              {item.desc}
            </Typography>
            <Typography variant="h3" component="div">
              Diagnosis
            </Typography>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: getwysiwygToHtml(item.diagonis),
                }}
              />
            </Typography>
            <Typography variant="h3" component="div">
              Treatment
            </Typography>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: getwysiwygToHtml(item.treatMent),
                }}
              />
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(index)}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const [patientRecordState, setPatientRecordState] = useState(null);
  const [patientRecordCnt, setPatientRecordCnt] = useState([]);

  useEffect(() => {
    console.log("called");
    getTemplateMedicalRecord();
  }, [patientRecordState]);

  const getwysiwygToHtml = (data) => {
    console.log(data);
    if (!_.isNull(data)) {
      console.log(data);
      const editorState = convertFromRaw(data);
      const h = EditorState.createWithContent(editorState);
      console.log(h);
      console.log("hello", stateToHTML(h.getCurrentContent()));
      return stateToHTML(h.getCurrentContent());
    }
  };

  const getTemplateMedicalRecord = () => {
    if (patientRecordState == null) {
      return null;
    } else {
      return patientRecordState.patientData.record.map((item, i) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBlock: 2,
              }}
            >
              <Box>
                <Typography variant="h5" component="div">
                  Name
                </Typography>
                <Typography>{item.name}</Typography>
              </Box>
              <Box>
                <IconButton>
                  <ArrowForwardIosIcon
                    onClick={() => {
                      let temp = patientRecordCnt;
                      patientRecordCnt[i] =
                        patientRecordCnt[i] == true ? false : true;
                      console.log(patientRecordCnt);
                      setPatientRecordCnt([...temp]);
                    }}
                  />
                </IconButton>
                {DialogVaidya(item, i)}
              </Box>
            </Box>
            <Divider sx={{ borderBottomWidth: 1.5 }} />
          </>
        );
      });
    }
  };

  useEffect(() => {
    async function getRecord() {
      // let response = await health.get(`/doctor/patient/PYm3D-Q4kf`, {
      //   headers: {
      //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiRFJtTzN6azFMdiIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2NjE0MjYxNzgsImV4cCI6MTY2MTQyOTc3OH0.2ZW_uPFMNdMKvNRYnEWjvautst1A2jHTZOq0wviJQW8",
      //     "did": "DRmO3zk1Lv"
      //   }
      // })
      let response = {
        status: "success",
        patientData: {
          status: "success",
          patient: {
            address: "mumbai, maharashatra",
            district: "mumbai",
            docType: "patient",
            email: "rohit@gmail.com",
            name: "Rohit",
            password:
              "$2b$10$3Ex6Yn/jtxHprQSRhpXZWecf/buZNEp/zM7cRUdgvdE93mXv4gw82",
            phone: 1234567890,
            pid: "PYm3D-Q4kf",
            state: "maharashatra",
          },
          record: [
            {
              createTime: "12/01/2021",
              desc: "nk",
              diagonis: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: "8lq8s",
                    text: "hv",
                    type: "unstyled",
                  },
                ],
                entityMap: {},
              },
              diagonisReport: [
                "bafybeia765lw3sjmrgdwlvcplwo2gcsvg7x7ouwm6zveh2mn2237hgeahi",
              ],
              did: "DRmO3zk1Lv",
              docType: "record",
              drugsName: null,
              drugsReport: [],
              name: "jhj",
              pid: "PYm3D-Q4kf",
              rid: "R4eW0_xmMi",
              treatMent: null,
              treatmentReport: [],
            },
            {
              createTime: "12/01/2021",
              desc: "uiguiy",
              diagonis: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: "aohu8",
                    text: "kljh",
                    type: "unstyled",
                  },
                ],
                entityMap: {},
              },
              diagonisReport: [
                "bafybeia765lw3sjmrgdwlvcplwo2gcsvg7x7ouwm6zveh2mn2237hgeahi",
              ],
              did: "DRmO3zk1Lv",
              docType: "record",
              drugsName: null,
              drugsReport: [],
              name: "mal",
              pid: "PYm3D-Q4kf",
              rid: "RWUQEZkXCD",
              treatMent: null,
              treatmentReport: [],
            },
          ],
        },
      };
      //response = await response
      console.log("set patient dat");
      if (response.status == "success") {
        if (response.patientData.record.length > 0) {
          console.log("true");
          setPatientRecordState(response);
          setPatientRecordCnt(response.patientData.record.map(() => false));
        }
      }
    }
    getRecord();
  }, []);

  const [value, setValue] = useState(0);
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (i) => {
    let temp = patientRecordCnt;
    temp[i] = false;
    console.log(temp);
    setPatientRecordCnt([...temp]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard>
      <IconButton sx={{ mb: 2 }}>
        <ArrowBackIcon
          onClick={() => {
            navigate("/utils/curr-patient");
          }}
        />
      </IconButton>
      {patientRecordState != null ? (
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Avatar
                sx={{ width: 56, height: 56, marginInline: 2 }}
                alt="Remy Sharp"
                src="assets/images/user.png"
              />
              <Box>
                <Typography variant="h2" component="div">
                  {patientRecordState.patientData.patient.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Phone No: {patientRecordState.patientData.patient.phone}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h3" component="div">
                  Info
                </Typography>
                <Typography variant="body1" component="div">
                  24, Jul 12, 1998
                </Typography>
                <Typography variant="body1" component="div">
                  167cm
                </Typography>
                <Typography variant="body1" component="div">
                  {patientRecordState.patientData.patient.address}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h3" component="div">
                  Medical Problem
                </Typography>
                <Typography variant="body1" component="div">
                  Asthma
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Today's Consulation" {...a11yProps(0)} />
                  <Tab label="Reports" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <AddDisease />
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{ border: "1.5px solid rgba(0, 0, 0, .125)", p: 2 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ mb: 2 }} variant="h2" component="div">
                          MedicalRecord
                        </Typography>
                      </Box>
                      <Divider sx={{ borderBottomWidth: 1.5 }} />
                      {getTemplateMedicalRecord()}
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TestTable patientRecordState={patientRecordState} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </MainCard>
  );
};
export default UIColor;
