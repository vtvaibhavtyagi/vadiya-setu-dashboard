import PropTypes from "prop-types";
import { useState } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button,
  CardActions,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";

// project imports
import SubCard from "ui-component/cards/SubCard";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import { gridSpacing } from "store/constant";
// assets
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import { useContext, useEffect } from "react";
import AuthContext from "AuthContext";
import { useNavigate } from "react-router-dom";

import health from "../../../src/api/health";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowingTwoTone } from "@mui/icons-material";

// ===============================|| PenApprovals ||=============================== //

const getRequestsData = async (AuthState) => {
  console.log(AuthState.state.id);
  let response = await health.get("/patient/showreq", {
    headers: {
      pid: AuthState.state.id,
      Authorization: "Bearer " + AuthState.state.auth_token,
    },
  });
  response = await response.data;
  console.log(response);
  return response;
};

function AcceptReq(AuthState, row) {
  var data = {
    aid: row.aid,
    did: row.did,
  };
  console.log("Button Dabaya");
  let response = health.post("/patient/grant", (data = data), {
    headers: {
      pid: row.pid,
      Authorization: "Bearer " + AuthState.state.auth_token,
    },
  });
  response = response.data;

  return response;
}

const PenApprovals = () => {
  const theme = useTheme();

  const AuthState = useContext(AuthContext);
  var isEmpty = false;
  var history = useNavigate();
  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    async function someFunc() {
      let respons = await getRequestsData(AuthState);
      if (respons.status === "success") {
        if (respons.payload.length > 0) {
          setPatientList(respons.payload);
        } else {
          isEmpty = true;
          console.log("erwt");
        }
      }
      console.log(respons, AuthState.state.id);
    }

    if (AuthState.state.id) {
      if (AuthState.state.role !== "pat") {
        history("/utils/patient-history");
      } else {
        someFunc();
      }
    } else {
      history("/login");
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Doctor</TableCell>
            <TableCell align="right">Specilization</TableCell>
            <TableCell align="right">Hospital</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientList.map((row, i) => (
            <TableRow
              key={row.doctorName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.doctorName}
              </TableCell>
              <TableCell align="right">{row.reqTime}</TableCell>
              <TableCell align="right">{row.pid}</TableCell>
              <TableCell align="right">
                <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
                  <Button
                    size="small"
                    disableElevation
                    sx={{
                      backgroundColor: theme.palette.success.light,
                      color: theme.palette.success.dark,
                    }}
                    onClick={() => AcceptReq(AuthState, row)}
                  >
                    Accept
                  </Button>
                </CardActions>
                <CardActions
                  sx={{
                    p: 1.25,
                    pt: 0,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    size="small"
                    disableElevation
                    sx={{
                      backgroundColor: theme.palette.error.light,
                      color: theme.palette.error.dark,
                    }}
                  >
                    Reject
                  </Button>
                </CardActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// PenApprovals.propTypes = {
//   isLoading: PenApprovals.bool,
// };

export default PenApprovals;
