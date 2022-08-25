import PropTypes from 'prop-types';
import { useRef } from "react";

// material-ui
import { Box, Card, Grid, Typography, CardContent, CardActions, Button } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import SearchRecord from './SearchRecord'
import { useSpring, animated, useSprings, config } from "react-spring";
import { CARDS } from "./common";
import { useState } from 'react';

const springConfig = {
  tension: 350,
  friction: 60,
  precision: 0.001,
  velocity: 0.001,
  clamp: true,
};

const POSITION_MULTIPLIER_CONFIG = {
  active: 1.8,
  before: {
    extreme: 0.1,
    rest: 0.3,
  },
  after: {
    extreme: 1.2,
    rest: 1.8,
  },
};

const CARD_STACK_MARGIN = 20;
const DURATION = 300;
const CARD_HEIGHT = 200;
const BASE_Z_INDEX = 9;

const from = (i) => ({
  y: -500,
  scale: 1,
  x: 0,
  rotateZ: 0,
  transformOrigin: "center",
  zIndex: i + BASE_Z_INDEX,
});


const getWrapperHeight = () => {
  let height = 0;
  if (CARDS.length > 1) {
    height = CARD_HEIGHT + CARD_STACK_MARGIN * (CARDS.length - 1);
  } else if (CARDS.length === 1) {
    height = CARD_HEIGHT;
  }
  return height;
};

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
  const [orderCnt, setOrderCnt] = useState(0);
  const order = useRef(CARDS.map((_, index) => index));
  const [wrapperSpring, setWrapperSpring] = useSpring(() => ({
    height: `${getWrapperHeight()}px`,
  }));
  const [billCardSprings, setBillCardSprings] = useSprings(
    CARDS.length,
    (index) => {
      const idx = order.current.indexOf(index);
      return {
        from: { ...from(idx), y: getWrapperHeight() / 2 - CARD_HEIGHT / 2 },
        to: async (animate) => {
          await animate({
            y: idx * CARD_STACK_MARGIN,
            rotateZ: idx === CARDS.length - 1 ? -3 : idx % 2 ? -1 : 1,
            zIndex: idx + BASE_Z_INDEX,
            immediate: (key) => key === "zIndex",
            delay: DURATION * 0.7,
            config: { ...config.gentle },
          });
          await animate({
            y: idx * CARD_STACK_MARGIN,
            rotateZ: 0,
            zIndex: idx + BASE_Z_INDEX,
            immediate: (key) => key === "zIndex",
            config: { duration: DURATION * 0.1 },
          });
        },
        immediate: (key) => key === "zIndex",
        config: {
          duration: DURATION * 0.1,
        },
      };
    }
  );


  const resizeWrapper = () => {
    setWrapperSpring.stop();
    setWrapperSpring.start({
      from: {
        height: `${getWrapperHeight()}px`,
      },
      to: async (animate) => {
        await animate({
          height: `${getWrapperHeight() + CARD_STACK_MARGIN * 1.2}px`,
        });
        await animate({
          height: `${getWrapperHeight()}px`,
        });
      },
      config: {
        ...springConfig,
        duration: DURATION,
      },
    });
  };

  const handleOrder = (index) => {
    const oldOrder = [...order.current];
    const newOrder = [...order.current];
    console.log(order.current)
    newOrder.splice(index, 1);
    newOrder.push(order.current[index]);
    order.current = newOrder;
    return {
      oldOrder,
      newOrder,
      getOldOrderIndex: function (index) {
        return this.oldOrder.indexOf(index);
      },
      getNewOrderIndex: function (index) {
        return this.newOrder.indexOf(index);
      },
    };
  };

  const handleClick = (cardIndex) => {
    // click animation logic
    const index = order.current.indexOf(cardIndex);
    console.log(cardIndex)
    console.log(index)
    if (index < CARDS.length - 1) {
      const orderDetails = handleOrder(index);
      resizeWrapper();
      setBillCardSprings.stop();
      setBillCardSprings.start((itemIndex) => {
        const newIndex = orderDetails.getNewOrderIndex(itemIndex);
        const oldIndex = orderDetails.getOldOrderIndex(itemIndex);

        // clicked card
        if (oldIndex === index) {
          return {
            from: {
              y: oldIndex * CARD_STACK_MARGIN,
              rotateZ: 0,
              zIndex: oldIndex + BASE_Z_INDEX,
              config: { duration: DURATION * 0.1 },
            },
            to: async (animate) => {
              await animate({
                y:
                  oldIndex * CARD_STACK_MARGIN -
                  CARD_STACK_MARGIN *
                  (oldIndex === 0 ? 1 : POSITION_MULTIPLIER_CONFIG.active),
                rotateZ: 10,
                zIndex: oldIndex + BASE_Z_INDEX,
                immediate: (key) => key === "zIndex",
              });
              await animate({
                y: newIndex * CARD_STACK_MARGIN,
                rotateZ: 0,
                zIndex: 6 + BASE_Z_INDEX,
                config: springConfig,
                immediate: (key) => key === "zIndex",
              });
            },
            config: { duration: DURATION * 0.8 },
          };
        } else if (oldIndex < index) {
          return {
            from: {
              y: oldIndex * CARD_STACK_MARGIN,
              rotateZ: 0,
              zIndex: oldIndex + BASE_Z_INDEX,
            },
            to: async (animate) => {
              await animate({
                y:
                  oldIndex > 0
                    ? oldIndex * CARD_STACK_MARGIN + CARD_STACK_MARGIN * 0.3
                    : oldIndex * CARD_STACK_MARGIN + CARD_STACK_MARGIN * 0.1,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key) => key === "zIndex",
              });
              await animate({
                y: newIndex * CARD_STACK_MARGIN,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key) => key === "zIndex",
                config: springConfig,
              });
            },
            config: { duration: DURATION * 0.8 },
          };
        } else {
          let details = {
            from: {
              y: oldIndex * CARD_STACK_MARGIN,
              rotateZ: 0,
              zIndex: oldIndex + BASE_Z_INDEX,
            },
            to: async (animate) => {
              await animate({
                y:
                  oldIndex * CARD_STACK_MARGIN +
                  CARD_STACK_MARGIN * POSITION_MULTIPLIER_CONFIG.after.rest,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key) => key === "zIndex",
              });
              await animate({
                y: newIndex * CARD_STACK_MARGIN,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key) => key === "zIndex",
                config: springConfig,
              });
            },
            config: {
              duration: DURATION * 0.8,
            },
          };

          // last card in old stack
          if (oldIndex === CARDS.length - 1) {
            details = {
              from: {
                ...details.from,
              },
              to: async (animate) => {
                await animate({
                  y:
                    oldIndex * CARD_STACK_MARGIN +
                    CARD_STACK_MARGIN *
                    POSITION_MULTIPLIER_CONFIG.after.extreme,
                  rotateZ: 0,
                  zIndex: oldIndex + BASE_Z_INDEX,
                  immediate: (key) => key === "zIndex",
                });
                await animate({
                  y: newIndex * CARD_STACK_MARGIN,
                  rotateZ: 0,
                  zIndex: newIndex + BASE_Z_INDEX,
                  immediate: (key) => key === "zIndex",
                  config: springConfig,
                });
              },
              config: { duration: DURATION * 0.8 },
            };
          }
          return { ...details };
        }
      });
    }
  };

  const nextClick = (orderCnt) => {
    
  }

  return (<MainCard>
    <SearchRecord />
    <div style={{ display: "flex" }}>
      <animated.div style={wrapperSpring} className="wrapper">
        {billCardSprings.map((styles, index) => (
          <animated.div
            style={{
              ...styles,
              position: "absolute"
            }}
            onClick={() => handleClick(index)}
            key={"card-" + index}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {CARDS[index].source}
                </Typography>
                <Typography variant="h5" component="div">
                  {CARDS[index].destination}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card>
          </animated.div>
        ))}
      </animated.div>
    </div>
    <Button variant="outlined" onClick={() => nextClick(orderCnt)}>Next</Button>
  </MainCard>)
};

export default UIColor;
