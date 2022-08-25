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

  return response;
};

function AcceptReq(AuthState, ele) {
  var data = {
    aid: ele.aid,
    did: ele.did,
  };
  console.log("Button Dabaya");
  let response = health.post("/patient/grant", (data = data), {
    headers: {
      pid: ele.pid,
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

    someFunc();
  }, []);

  const dateFormatter = (date) => {
    return format(new Date(date), "dd/MMM");
  };

  return (
    <>
      <MainCard content={false}>
        <CardContent>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignContent="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h3" color="inherit">
                    Doctor
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" color="inherit">
                    Specilization
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" color="inherit">
                    Hospital
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" color="inherit">
                    Action
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* doctor details */}
            {patientList.map((ele) => (
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="subtitle1" color="inherit">
                      {ele.doctorName}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          {ele.did}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          {ele.reqTime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item container>
                        <Grid item>
                          <CardActions
                            sx={{ p: 1.25, pt: 0, justifyContent: "center" }}
                          >
                            <Button
                              size="small"
                              disableElevation
                              sx={{
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                              }}
                              onClick={() => AcceptReq(AuthState, ele)}
                            >
                              Accept
                            </Button>
                          </CardActions>
                        </Grid>

                        <Grid item>
                          <Grid item>
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
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1.5 }} />
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
          <Button size="small" disableElevation>
            {isEmpty ? "View All" : "No pending requests"}
            <ChevronRightOutlinedIcon />
          </Button>
        </CardActions>
      </MainCard>
    </>
  );
};

PenApprovals.propTypes = {
  isLoading: PenApprovals.bool,
};

export default PenApprovals;

// import PropTypes from "prop-types";
// import { useState } from "react";
// // material-ui
// import { useTheme } from "@mui/material/styles";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Avatar,
//   Button,
//   CardActions,
//   Divider,
//   Menu,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import MuiTableHead from "@material-ui/core/TableHead";
// // project imports
// import SubCard from "ui-component/cards/SubCard";
// import MainCard from "ui-component/cards/MainCard";
// import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
// import { gridSpacing } from "store/constant";
// // assets
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
// import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
// import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

// // ===============================|| ApprovalHistory ||=============================== //

// const ApprovalHistory = ({ isLoading }) => {
//   const theme = useTheme();

//   const dateFormatter = (date) => {
//     return format(new Date(date), "dd/MMM/YYYY");
//   };

//   const columns = [
//     { id: "name", label: "Doctor", minWidth: 170 },
//     { id: "hos", label: "Hospital", minWidth: 100 },
//     {
//       id: "disease",
//       label: "Disease",
//       minWidth: 170,
//       align: "right",
//       format: (value) => value.toLocaleString("en-US"),
//     },

//     {
//       id: "action",
//       label: "Action",
//       minWidth: 170,
//       align: "right",
//       format: (value) => value.toFixed(2),
//     },
//   ];

//   function createData(name, hos, disease, action) {
//     // const density = dateFormatter(date)
//     return { name, hos, disease, action };
//   }

//   const rows = [
//     createData("Rahul", "nukkad", "Gyno", true),
//     createData("Rahul", "nukkad", "Gyno", false),
//   ];

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const TableHead = withStyles((theme) => ({
//     root: {
//       backgroundColor: "#80cc28",
//     },
//   }))(MuiTableHead);

//   return (
//     <>
//       {isLoading ? (
//         <SkeletonPopularCard />
//       ) : (
//         <MainCard content={false}>
//           <Paper sx={{ width: "100%", overflow: "hidden" }}>
//             <TableContainer>
//               <Table stickyHeader aria-label="sticky table">
//                 <TableHead>
//                   <TableRow>
//                     {columns.map((column) => (
//                       <TableCell
//                         key={column.id}
//                         align={column.align}
//                         style={{ minWidth: column.minWidth }}
//                       >
//                         {column.label}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row) => {
//                       return (
//                         <TableRow
//                           hover
//                           role="checkbox"
//                           tabIndex={-1}
//                           key={row.code}
//                         >
//                           {columns.map((column) => {
//                             if (column.id === "action") {
//                               <TableCell key={column.id} align={column.align}>
//                                 <Button
//                                   size="small"
//                                   disableElevation
//                                   sx={{
//                                     backgroundColor:
//                                       theme.palette.success.light,
//                                     color: theme.palette.success.dark,
//                                   }}
//                                 >
//                                   Accept
//                                 </Button>
//                                 ;
//                               </TableCell>;
//                             } else {
//                               const value = row[column.id];
//                               return (
//                                 <TableCell key={column.id} align={column.align}>
//                                   {value}
//                                 </TableCell>
//                               );
//                             }
//                           })}
//                         </TableRow>
//                       );
//                     })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <TablePagination
//               rowsPerPageOptions={[10, 25, 100]}
//               component="div"
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Paper>
//         </MainCard>
//       )}
//     </>
//   );
// };

// ApprovalHistory.propTypes = {
//   isLoading: PropTypes.bool,
// };

// export default ApprovalHistory;

{
  /* <Grid item>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item container>
                      <Grid item>
                        <CardActions
                          sx={{ p: 1.25, pt: 0, justifyContent: "center" }}
                        >
                          <Button
                            size="small"
                            disableElevation
                            sx={{  backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark }}
                          >
                            Accept
                          </Button>
                        </CardActions>
                      </Grid>

                      <Grid item>
                        <Grid item>
                          <CardActions
                            sx={{
                              p: 1.25,
                              pt: 0,
                              justifyContent: "center"

                            }}
                          >
                            <Button size="small" disableElevation sx={{
                              backgroundColor: theme.palette.error.light,
                              color: theme.palette.error.dark,
                            }}>
                              Reject
                            </Button>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid> */
}
