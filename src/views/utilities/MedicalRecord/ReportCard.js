import PropTypes from "prop-types";
import React, { useState, useMemo, useRef } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import Reactcardstack from "react-cards-stack";
import "./style.css";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import SubCard from "ui-component/cards/SubCard";

const db = [
  {
    name: "Cancer",
    url: "assets/images/report/diagnosis.svg",
  },
  {
    name: "Aids",
    url: "src/assets/images/report/disease.svg",
  },
  {
    name: "Covid",
    url: "src/assets/images/report/treatment.svg",
  },
];

const Advanced = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Card>
      
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={4}>
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={"vaibhav"}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <SubCard title="Disease">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <MuiTypography
                      variant="subtitle1"
                      gutterBottom
                    ></MuiTypography>
                  </Grid>
                  <Grid item>
                    <MuiTypography
                      variant="subtitle2"
                      gutterBottom
                    ></MuiTypography>
                  </Grid>
                </Grid>
              </SubCard>
            </TinderCard>
          ))}
        </Grid>

        <Grid item xs={12} sm={4}>
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={"vaibhav"}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <SubCard title="Diagnosis">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <MuiTypography
                      variant="subtitle1"
                      gutterBottom
                    ></MuiTypography>
                  </Grid>
                  <Grid item>
                    <MuiTypography
                      variant="subtitle2"
                      gutterBottom
                    ></MuiTypography>
                  </Grid>
                </Grid>
              </SubCard>
            </TinderCard>
          ))}
        </Grid>

        <Grid item xs={12} sm={4}>
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={"vaibhav"}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <SubCard title="Treatment">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <MuiTypography
                      variant="subtitle1"
                      gutterBottom
                    ></MuiTypography>
                  </Grid>
                  <Grid item>
                    <MuiTypography
                      variant="subtitle2"
                      gutterBottom
                    ></MuiTypography>
                  </Grid>
                </Grid>
              </SubCard>
            </TinderCard>
          ))}
        </Grid>

        
      </Grid>

      <div className="buttons">
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </Card>
  );
};

export default Advanced;
