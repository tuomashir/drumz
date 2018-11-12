import React, { Component } from 'react';

import Pattern from './components/Pattern'
import Track from './components/Track'
import PlayButton from './components/PlayButton'
import StopButton from './components/StopButton'

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
      tempo: 90,
      swing: 0,
    }
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleSwingChange = this.handleSwingChange.bind(this);
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
  startClock() {
    this.state.clock.start();
  }
  stopClock() {
    this.state.clock.stop();
  }
  handleTempoChange(e) {
    this.setState({
      tempo: e.target.value
    });
    this.state.clock.setTempo(e.target.value);
  }
  handleSwingChange(e) {
    this.setState({
      swing: e.target.value
    });
    this.state.clock.setSwing(e.target.value);
  }
  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <div style={{display: 'flex'}}>
            <PlayButton onClick={this.startClock} />
            <StopButton onClick={this.stopClock} />
            <div>
              Tempo: <input type="number" name="tempo" value={this.state.tempo} onChange={this.handleTempoChange} />
            </div>
            <div>
              Swing: <input type="number" name="swing" min="0" max="10" value={this.state.swing} onChange={this.handleSwingChange} />
            </div>
          </div>
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
