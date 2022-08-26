import PropTypes from "prop-types";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";

import CardContent from "@mui/material/CardContent";

// material-ui
import { Box, Card, Grid, Typography } from "@mui/material";

// project imports
import SubCard from "ui-component/cards/SubCard";
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "store/constant";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import VaidyaSetu from './VaidyaSetu';
import AuthContext from "AuthContext";
import health from "../../../src/api/health";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

// ===============================|| UI COLOR ||=============================== //

function UIColor() {
  const [open, setOpen] = React.useState(false);

  const [pid_req, setpid_req] = React.useState();

  const [respon, setrespon] = React.useState({ patientData: { name: "" } });

  const [checked, setChecked] = React.useState(false);
  var AuthState = useContext(AuthContext);
  var history = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    setChecked((prev) => !prev);
  };

  const SearchPatient = async (id, AuthState) => {
    // console.log(id,AuthState);
    var data = { pid: id };
    console.log(data);

    console.log(AuthState.state);
    let response = await health.post("/doctor/search", (data = data), {
      headers: {
        did: AuthState.state.id,
        Authorization: "Bearer " + AuthState.state.auth_token,
      },
    });

    response = await response.data;
    setrespon(response);
    handleOpen();
    console.log(response);
    return response;
  };

  async function RequestPatient(id, AuthState) {
    var data = { pid: id };
    let response = await health.post("/doctor/request", (data = data), {
      headers: {
        did: AuthState.state.id,
        Authorization: "Bearer " + AuthState.state.auth_token,
      },
    });
    response = await response.data;
    console.log(response);
    handleClose();
    return response;
  }
  function GetPatientData(id, AuthState) {
    history("/utils/patient-record", {
      state: {
        pid: id,
      },
    });
  }

  const pidreq_handler = (e) => {
    setpid_req(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked((prev) => !prev);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <MainCard title="Create Request">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard title="Patient ID">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Patient_ID"
                  onChange={pidreq_handler}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  onClick={(event) => SearchPatient(pid_req, AuthState)}
                  size="large"
                  sx={{ mt: 0.5 }}
                >
                  Get Details
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Zoom
          in={checked}
          style={{ transitionDelay: checked ? "50ms" : "0ms" }}
        >
          <Card sx={style}>
            <CardContent>
              <Typography variant="h3" color="inherit" sx={{ mx: "1" }}>
                {respon.patientData.name}
              </Typography>
              <Typography variant="subtitle1" color="inherit">
                {respon.patientData.email}
              </Typography>
              <br></br>
              {respon.access == 0 ? (
                <Button
                  variant="outlined"
                  onClick={(event) => RequestPatient(pid_req, AuthState)}
                  size="large"
                  sx={{ mt: 0.5 }}
                >
                  Send Request
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={(event) => GetPatientData(pid_req, AuthState)}
                  size="large"
                  sx={{ mt: 0.5 }}
                >
                  View Data
                </Button>
              )}
              {/* <Button variant="outlined" onClick={RequestPatient()} size="large" sx={{ mt: 0.5 }}>Send Request</Button> */}
            </CardContent>
          </Card>
        </Zoom>
      </Modal>

      {/* <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography>Name</Typography>
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={RequestPatient()} size="large" sx={{ mt: 0.5 }}>Send Request</Button>
                            </Grid>
                        </Grid>

                    </SubCard>
                </Grid>
            </Grid> */}
    </MainCard>
  );
}

export default UIColor;
