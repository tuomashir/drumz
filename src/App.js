import React, { Component } from 'react';
import './App.css';

import Pattern from './components/Pattern'
import Track from './components/Track'

import Clock from './services/Clock';

import kick from './assets/sounds/kick.wav';
import snare from './assets/sounds/snare.wav';
import hihat from './assets/sounds/hihat.wav';

import getAudioSource from './services/Audio';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      clock: new Clock(),
    }
  }
  componentDidMount() {
    this.state.clock.start();
    const audioContext = new AudioContext();

    Promise.all([
      getAudioSource({url: kick, audioContext}),
      getAudioSource({url: snare, audioContext}),
      getAudioSource({url: hihat, audioContext}),
    ]).then(sounds => {
      this.setState({
        ready: true,
        sounds,
      })
    });
  }
  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <Pattern length={16}>
            <Track key="track1" id="track1" clock={this.state.clock} createSource={this.state.sounds[0]} />
            <Track key="track2" id="track2" clock={this.state.clock} createSource={this.state.sounds[1]} />
            <Track key="track3" id="track3" clock={this.state.clock} createSource={this.state.sounds[2]} />
          </Pattern>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default App;
