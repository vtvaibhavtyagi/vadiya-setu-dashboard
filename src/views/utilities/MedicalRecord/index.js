import PropTypes from "prop-types";

// material-ui
import { Box, Card, Grid, Typography, Divider } from "@mui/material";

// project imports
import ReactCards from "./ReactCards";
import SubCard from "ui-component/cards/SubCard";
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "store/constant";
import SearchRecord from "./SearchRecord";
import ReportCard from "./ReportCard";

// ===============================|| UI COLOR ||=============================== //

const UIColor = () => (
  <Grid container spacing={gridSpacing}>
    <SearchRecord />
    <Grid item xs={12}>
      <ReactCards />
    </Grid>
  </Grid>
);

export default UIColor;
