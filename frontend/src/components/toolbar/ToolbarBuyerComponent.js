import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Navigate } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@material-ui/core/IconButton';

import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';

export default class ToolbarBuyerComponent extends Component {
  constructor(props) {
    super(props);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  state = { user: false };

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.micStatusChanged();
      this.props.toggleFullscreen();
    }, 1000);
    setTimeout(() => {
      this.props.toggleChat();
    }, 1300);
  }

  leaveSession() {
    this.props.leaveSession();
    this.setState(state => {
      return { user: !state.user };
    });
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const localUser = this.props.user;
    let { user } = this.state;
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div className="buttonsContent">
            {user && <Navigate to="/" replace={true} />}
            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
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
              onClick={this.toggleChat}
              id="navLeaveButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <FullscreenExit />
              ) : (
                <Fullscreen />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
