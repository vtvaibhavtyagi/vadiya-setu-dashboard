import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import health from "api/health"
// material-ui
import { Box, Card, Grid, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';




const getData = async () => {
    let response = await health.get("/doctor/patients/_all", {
        headers :{
            "did":"DdWkMSHClh"            
        }
    })
    response = await response.data
    return response;
}


// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ bgcolor, title, data, dark }) => (
    <>
        <Card sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff'
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
                    <Typography variant="subtitle2">{data.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        {data.name}
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
    dark: PropTypes.bool
};

// ===============================|| UI COLOR ||=============================== //

const UIColor = () => {
    
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

    return(
    <MainCard title="Patient History">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="Secondary Color">
                    <Grid container spacing={gridSpacing}>
                        {
                            patientList.map((ele)=> {
                                return   <ColorBox bgcolor="some" title="Hoo Gaya" data={ele.patient} dark/>
                            } )
                        }
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    </MainCard>
    );
}

export default UIColor;
