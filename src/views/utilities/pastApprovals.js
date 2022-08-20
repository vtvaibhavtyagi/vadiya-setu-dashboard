import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card,CardContent, Grid, Typography,Avatar, Button,CardActions,Divider,Menu,MenuItem } from '@mui/material';


// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
// assets
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


  


// ===============================|| ApprovalHistory ||=============================== //





const ApprovalHistory = ({ isLoading }) => {
    const theme = useTheme();

    const dateFormatter = (date) => {
        return format(new Date(date), "dd/MMM/yyyy");
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>

                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">Doctor</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">Specilization</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">Hospital</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">Date of Approval</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            
                            <Grid item xs={12}>
                                
                                    
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                   rahul
                                                </Typography>
                                            </Grid>

                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                           gynecologist
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>

                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            nukkad
                                                        </Typography>
                                                    </Grid>
                                            
                                                </Grid>
                                            </Grid>

                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                            
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {dateFormatter(15/12/2022)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                            
                                
                                
                                
                                <Divider sx={{ my: 1.5 }} />

                                
                            </Grid>



                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

ApprovalHistory.propTypes = {
    isLoading: PropTypes.bool
};

export default ApprovalHistory;

