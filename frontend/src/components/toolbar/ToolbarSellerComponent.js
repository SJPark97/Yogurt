import React, { Component } from 'react';
import './ToolbarComponent.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Tooltip from '@material-ui/core/Tooltip';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@material-ui/core/IconButton';
import CloseLive from './CloseLive';

export default class ToolbarSellerComponent extends Component {
  constructor(props) {
    super(props);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  leaveSession() {
    this.props.leaveSession();
    axios.patch(
      `https://i8b204.p.ssafy.io/be-api/live/close?id=${Number(
        this.props.liveId,
      )}`,
    );
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const localUser = this.props.user;
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div className="buttonsContent">
            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <CloseLive />
            </IconButton>
            <div id="box-1"></div>
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <Mic />
              ) : (
                <MicOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <Videocam />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton>
            <div id="box-1"></div>
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="sellerCamButton navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
