import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import {
    Grid,
    Link,
    Avatar,
    CardActions,
    Typography,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
  } from "@mui/material";
  import SubCard from "ui-component/cards/SubCard";
import MainCard from "ui-component/cards/MainCard";

export default class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
    console.log( data)
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <MainCard>
          <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </MainCard>
        
    )
  }
}