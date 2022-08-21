import { ToggleCard, TinderLikeCard, StackCard } from "react-stack-cards";
import React from "react";
import ReactCards2 from "./ReactCards2";
import Datajson from "./Datajson.json";
import { gridSpacing } from "store/constant";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Zoom from "@mui/material/Zoom";
import SubCard from "ui-component/cards/SubCard";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

var dis = Datajson.disease;
var st_color_class = "card-title";

export default class ReactCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directionTinder: "swipeCornerDownLeft",
      directionToggle: "sideSlide",
      directionStack: "topRight",
      isOpen: false,
      swip: false,
      dis_tar: 0,
      zooom: false,
      RC2_swip: true,
      zoom_card_name: "disease",
    };
    this.Tinder = null;
  }

  onTinderSwipe() {
    //this.setState({ swip: true });
    if (this.state.dis_tar < dis.length - 1) {
      this.setState({ dis_tar: this.state.dis_tar + 1 });
    } else {
      this.setState({ dis_tar: 0 });
    }
    this.setState({ RC2_swip: true });
    this.Tinder.swipe();
  }
  onzoom(card_name) {
    console.log(card_name);
    this.setState({ zooom: !this.state.zooom });
    this.setState({ RC2_swip: false });
    console.log(this.state.zooom);
    if (card_name == "disease") {
      dis[this.state.dis_tar].status == "open"
        ? (st_color_class = "text-success")
        : (st_color_class = "text-danger");
      this.setState({ zoom_card_name: "disease" });
    } else if (card_name == "diagno") {
      this.setState({ zoom_card_name: "diagno" });
    } else {
      this.setState({ zoom_card_name: "treatment" });
    }
  }

  onToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  componentDidUpdate() {
    //this.Tinder.swipe();
    console.log("SW_UPdate");
  }

  render() {
    const arr = ["first", "second", "third", "fourth", "fifth", "sixth"];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    //const colors = ["red", "blue", "green"];
    var card = (
      <div
        className="card text-dark shadow-lg bg-white mb-3"
        style={{
          height: "600px",
          width: "1500px",
          marginTop: "250px",
          marginLeft: "150px",
        }}
      >
        <div className="card-header">
          <b>Disease</b>
        </div>
        <div className="card-body">
          <h2 className="card-title">Nothing to show</h2>
        </div>
      </div>
    );

    if (this.state.zoom_card_name == "disease") {
      card = (
        <div
          className="card text-dark shadow-lg bg-white mb-3"
          style={{
            height: "600px",
            width: "1500px",
            marginTop: "250px",
            marginLeft: "150px",
          }}
        >
          <div className="card-header">
            <b>Disease</b>
          </div>
          <div className="card-body">
            <h3 className="card-title">
              <i>{dis[this.state.dis_tar].name}</i>
            </h3>
            <h5 className="card-title">
              Date Of Registration:-{dis[this.state.dis_tar].dateOfReg}
            </h5>
            <h5 className={st_color_class}>{dis[this.state.dis_tar].status}</h5>
            <br />
            <h5 className="card-title">Reports</h5>
            <ul>
              {dis[this.state.dis_tar].reports.map((dis_repo) => (
                <li className="card-text">
                  <h6>{dis_repo}</h6>
                </li>
              ))}
            </ul>
            <h6 className="card-text" style={{ fontSize: "17px" }}>
              {dis[this.state.dis_tar].desc}
            </h6>
          </div>
        </div>
      );
    } else if (this.state.zoom_card_name == "diagno") {
      card = (
        <div
          className="card text-dark shadow-lg bg-white mb-3"
          style={{
            height: "600px",
            width: "1500px",
            marginTop: "250px",
            marginLeft: "150px",
          }}
        >
          <div className="card-header">
            <b>Diagnostics</b>
          </div>
          <div className="card-body">
            {dis[this.state.dis_tar].diagnosis.map((diag_data) => (
              <div>
                <h3 className="card-title">{diag_data.date}</h3>
                <br />
                <h4 className="card-title">Symptoms</h4>
                <ul>
                  {diag_data.vSymptoms.map((data_sym) => (
                    <li className="card-text">
                      <h5>{data_sym}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (this.state.zoom_card_name == "treatment") {
      card = (
        <div
          className="card text-dark shadow-lg bg-white mb-3"
          style={{
            height: "600px",
            width: "1500px",
            marginTop: "250px",
            marginLeft: "150px",
          }}
        >
          <div className="card-header">
            <b>Treatment</b>
          </div>
          <div className="card-body">
            <Grid>
              <Grid item xs={6}>
                <h5 className="card-title">Treatment Details</h5>
                {dis[this.state.dis_tar].treatment.map((data_treat) => (
                  <div>
                    <ul>
                      <li>
                        <h6 className="card-title">{data_treat.desc}</h6>
                        <h7 className="card-title">{data_treat.date}</h7>
                      </li>
                    </ul>
                  </div>
                ))}
              </Grid>
              <Grid item xs={6}>
                <h5 className="card-title">Drugs</h5>
                {dis[this.state.dis_tar].drugs.map((data_drugs) => (
                  <div>
                    <ul>
                      <li>
                        <h6 className="card-title">{data_drugs.name}</h6>
                        <h7 className="card-title">{data_drugs.date}</h7>
                      </li>
                    </ul>
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }

    return (
      <>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={4}>
            <TinderLikeCard
              images={arr}
              width="350"
              height="250"
              direction={this.state.directionTinder}
              duration={400}
              ref={(node) => (this.Tinder = node)}
              className="tinder"
            >
              <SubCard title="Disease">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h3" color="inherit">
                      {dis[this.state.dis_tar].name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body" color="inherit">
                      {dis[this.state.dis_tar].desc}
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>

              {/* <div className="card text-white shadow-lg bg-dark mb-3" >
                                <div className="card-header">Disease</div>
                                <div className="card-body">
                                    <h5 className="card-title">{dis[this.state.dis_tar].name}</h5>
                                    <p className="card-text text-justify ">{dis[this.state.dis_tar].desc}</p>
                                </div>
                            </div> */}
            </TinderLikeCard>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* <ReactCards2
              swipee="swipeDown"
              dis2={dis[this.state.dis_tar]}
              rc2_swipp={this.state.RC2_swip}
              targett="diagno"
            /> */}
            <TinderLikeCard
              images={arr}
              width="350"
              height="250"
              direction={this.state.directionTinder}
              duration={400}
              ref={(node) => (this.Tinder = node)}
              className="tinder"
            >
              <SubCard title="Diagnostics">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    {dis[this.state.dis_tar].diagnosis.map((data_diag) => (
                      <div>
                        <h5 className="card-title">{data_diag.date}</h5>
                        <ul>
                          {data_diag.vSymptoms.map((data_symp) => (
                            <li className="card-text">{data_symp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Grid>
                </Grid>
              </SubCard>
            </TinderLikeCard>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* <ReactCards2
              swipee="swipeCornerDownRight"
              dis2={dis[this.state.dis_tar]}
              rc2_swipp={this.state.RC2_swip}
              targett="treatment"
            /> */}

            <TinderLikeCard
              images={arr}
              width="350"
              height="250"
              direction={this.state.directionTinder}
              duration={400}
              ref={(node) => (this.Tinder = node)}
              className="tinder"
            >
              <SubCard title="Diagnostics">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    {dis[this.state.dis_tar].treatment
                      .slice(0, 3)
                      .map((data_treat) => (
                        <div>
                          <ul>
                            <li>
                              <h5 className="card-title">{data_treat.desc}</h5>
                              <h6 className="card-title">{data_treat.date}</h6>
                            </li>
                          </ul>
                        </div>
                      ))}
                  </Grid>
                </Grid>
              </SubCard>
            </TinderLikeCard>
          </Grid>

          <Grid item>
          <Grid container alignItems="center" justifyContent="centre" >
            <Grid item>
              <ArrowBackIosIcon
                onClick={this.onTinderSwipe.bind(this)}
                sx={{
                  color: "Orange",
                  ml: 2,
                }}
                fontSize="large"
              />
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon
                onClick={this.onTinderSwipe.bind(this)}
                sx={{
                  color: "Orange",
                  ml: 2,
                }}
                fontSize="large"
              />
            </Grid>
          </Grid>
        </Grid>

          
        </Grid>

        

        {/* <Grid item xs={4}>
            <button
              className="btn btn-warning"
              style={{ marginTop: "230px", width: "68%" }}
              onClick={this.onzoom.bind(this, "disease")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-chevron-double-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </Grid>
          <Grid item xs={4}>
            <button
              className="btn btn-warning"
              style={{ marginTop: "230px", width: "68%" }}
              onClick={this.onzoom.bind(this, "diagno")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-chevron-double-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </Grid>
          <Grid item xs={4}>
            <button
              className="btn btn-warning"
              style={{ marginTop: "230px", width: "68%" }}
              onClick={this.onzoom.bind(this, "treatment")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-chevron-double-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </Grid> */}

        {/* <button
              className="btn btn-danger"
              style={{ marginTop: "20px", width: "36%" }}
              onClick={this.onTinderSwipe.bind(this)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-arrow-down-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
              </svg>
            </button> */}

        <Modal
          open={this.state.zooom}
          onClose={this.onzoom.bind(this)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Zoom
            in={this.state.zooom}
            style={{ transitionDelay: this.state.zooom ? "200ms" : "0ms" }}
          >
            {card}
          </Zoom>
        </Modal>
      </>
    );
  }
}
