import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
import AuthContext from "AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// ===============================|| UI COLOR ||=============================== //

const UIColor = () => {
  const AuthState = useContext(AuthContext);
  var history = useNavigate();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    // if( AuthState.state.id ){
    //     if( AuthState.state.role !== 'pat' ){
    //       history("/utils/patient-history");
    //     }
    //   }else{
    //     history("/login");
    //   }
  }, []);

  return (
    <>
      
        <ReactCards />

        {/* </MainCard> */}
  
    </>
  );
};

export default UIColor;
