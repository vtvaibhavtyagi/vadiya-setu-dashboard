import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Zoom from '@mui/material/Zoom';

import CardContent from '@mui/material/CardContent';

// material-ui
import { Box, Card, Grid, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VaidyaSetu from './VaidyaSetu';

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
                    <Typography variant="subtitle2">{data.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
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
    dark: PropTypes.bool
};

// ===============================|| UI COLOR ||=============================== //

function UIColor() {
    const [open, setOpen] = React.useState(false);

    const [checked, setChecked] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setChecked((prev) => !prev);
    };
    const handleClose = () => {
        setOpen(false);
        setChecked((prev) => !prev);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
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
                                <TextField id="outlined-basic" label="Patient_ID" variant="outlined" fullWidth="true" />
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={handleOpen} size="large" sx={{ mt: 0.5 }}>Get Details</Button>
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
                <Zoom in={checked} style={{ transitionDelay: checked ? '100ms' : '0ms' }}>
                    <Card sx={style}>
                        <CardContent>
                            <Typography>Helo</Typography>
                        </CardContent>
                    </Card>
                </Zoom>
            </Modal>


        </MainCard>
    )
}

export default UIColor;
