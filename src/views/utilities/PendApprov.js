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


// ===============================|| PenApprovals ||=============================== //

const PenApprovals = () => {
  const theme = useTheme();

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
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="subtitle1" color="inherit">
                    rahul
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
                        gynecologist
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
                        nukkad
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
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.5 }} />
            </Grid>
          </Grid>


        </CardContent>
        <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
          <Button size="small" disableElevation>
            View All
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

{
  /* <Grid item xs={3}>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                            </Grid> */
}
