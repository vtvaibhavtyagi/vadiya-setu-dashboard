import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Grid, Typography, TextField, Button, InputAdornment, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import health from "api/health"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import AddDisease from "./AddDisease";

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

const UIColor = () => {
  const [pid, setPid] = useState("");
  const [patientData, setPatientData] = useState(null)
  const searchPatient = async (e) => {
    let response = await health.post("/doctor/search", {
      pid
    }, {
      headers: {
        did: "D1nsdbE_bM"
      }
    })
    response = await response.data;
    console.log(response)
  }

  return (
    <MainCard title="Current patient">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <TextField placeholder="Search Patient ID" value={pid} onChange={(e) => setPid(e.target.value)} InputProps={{
            endAdornment: (
              <InputAdornment sx={{ cursor: "pointer" }} position="end" onClick={() => searchPatient()}>
                <SearchIcon />
              </InputAdornment>
            )
          }} />
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem secondaryAction={
              <>
                <Tooltip title="Edit Details">
                  <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Disease">
                  <IconButton edge="end" aria-label="add">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </>
            }>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
            {/* <AddDisease /> */}
        </Grid>
      </Grid>
    </MainCard>
  );
}
export default UIColor;
