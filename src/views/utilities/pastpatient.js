// import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';
// import health from "api/health"
// // material-ui
// import { Box, Card, Grid, Typography } from '@mui/material';

// // project imports
// import SubCard from 'ui-component/cards/SubCard';
// import MainCard from 'ui-component/cards/MainCard';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { gridSpacing } from 'store/constant';




// const getData = async () => {
//     let response = await health.get("/doctor/patients/_all", {
//         headers :{
//             "did":"DdWkMSHClh"            
//         }
//     })
//     response = await response.data
//     return response;
// }


// // ===============================|| COLOR BOX ||=============================== //

// const ColorBox = ({ bgcolor, title, data, dark }) => (
//     <>
//         <Card sx={{ mb: 3 }}>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     py: 4.5,
//                     bgcolor,
//                     color: dark ? 'grey.800' : '#ffffff'
//                 }}
//             >
//                 {title && (
//                     <Typography variant="subtitle1" color="inherit">
//                         {title}
//                     </Typography>
//                 )}
//                 {!title && <Box sx={{ p: 1.15 }} />}
//             </Box>
//         </Card>
//         {data && (
//             <Grid container justifyContent="space-between" alignItems="center">
//                 <Grid item>
//                     <Typography variant="subtitle2">{data.name}</Typography>
//                 </Grid>
//                 <Grid item>
//                     <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
//                         {data.name}
//                     </Typography>
//                 </Grid>
//             </Grid>
//         )}
//     </>
// );

// ColorBox.propTypes = {
//     bgcolor: PropTypes.string,
//     title: PropTypes.string,
//     data: PropTypes.object.isRequired,
//     dark: PropTypes.bool
// };

// // ===============================|| UI COLOR ||=============================== //

// const UIColor = () => {
    
    // const [patientList, setPatientList] = useState([])
    // useEffect(() => {
    //     async function someFunc(){
    //         let respons = await getData();
    //         if (respons.status === "success"){
    //             setPatientList( respons.patientList );
    //         }          
    //         console.log(respons);
    //     }
         
    //     someFunc();
    // },[]);

//     return(
//     <MainCard title="Patient History">
//         <Grid container spacing={gridSpacing}>
//             <Grid item xs={12}>
//                 <SubCard title="Secondary Color">
//                     <Grid container spacing={gridSpacing}>
//                         {
//                             patientList.map((ele)=> {
//                                 return   <ColorBox bgcolor="some" title="Hoo Gaya" data={ele.patient} dark/>
//                             } )
//                         }
//                     </Grid>
//                 </SubCard>
//             </Grid>
//         </Grid>
//     </MainCard>
//     );
// }

// export default UIColor;


import PropTypes from 'prop-types';
import { useState , useEffect} from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card,CardContent, Grid, Typography,Avatar, Button,CardActions,Divider,Menu,MenuItem } from '@mui/material';


// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";

import health from 'api/health';


// ===============================|| PatientDetail ||=============================== //


const getData = async () => {
    let response = await health.get("/doctor/patientlist", {
        headers :{
            "did":"DdWkMSHClh"            
        }
    })
    response = await response.data
    return response;
}

const getPatientData = async () => {
    let response = await health.get("/doctor/patients/_all", {
        headers :{
            "did":"DdWkMSHClh"            
        }
    })
    response = await response.data
    return response;
}


const PatientDetail = ({ isLoading }) => {
    const theme = useTheme();

    const [patientList, setPatientList] = useState([])
    useEffect(() => {
        async function someFunc(){
            let respons = await getData();
            if (respons.status === "success"){
                setPatientList( respons.patientList );
            }          
            console.log(respons);
        }
         
        someFunc();
    },[]);
   
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
                                        <Typography variant="h3" color="inherit">Patient Name</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">Date</Typography>
                                    </Grid>
                                    {/* <Grid item>
                                        <Typography variant="h3" color="inherit">Disease</Typography>
                                    </Grid> */}
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">Status</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            { patientList.map( (ele) =>                                 
                                                                
                            <Grid item xs={12}>
                                
                                    
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                <Button variant="text" onClick={getPatientData()}>{ele.patient.name}</Button>
                                                </Typography>
                                            </Grid>

                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                        {dateFormatter(ele.record.recordTime)}
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>

                                            {/* <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                        {ele.patient.name}
                                                        </Typography>
                                                    </Grid>
                                            
                                                </Grid>
                                            </Grid> */}

                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                            
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            sx={{
                                                                width: 20,
                                                                height: 20,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.success.light,
                                                                color: theme.palette.success.dark,
                                                                ml: 2
                                                            }}
                                                        >
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                            
                                
                                
                                
                                <Divider sx={{ my: 1.5 }} />

                                
                            </Grid>

               )}

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

PatientDetail.propTypes = {
    isLoading: PropTypes.bool
};

export default PatientDetail;


{/* <Grid item xs={3}>
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
                            </Grid> */}