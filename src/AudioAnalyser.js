import React, { Component } from 'react';

import AudioVisualiser from './AudioVisualiser';

const displayCount = 1000;

const sampleCount = 2;

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(displayCount).fill(128) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    const sampleWidth = Math.floor(this.dataArray.length / sampleCount);
    const samples = this.dataArray.filter((d, i) => i % sampleWidth === 0);
    this.setState({ audioData: [...this.state.audioData.slice(samples.length, displayCount), ...samples] });

    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <AudioVisualiser audioData={this.state.audioData} width={this.props.width} height={this.props.height} />;
  }
}

export default AudioAnalyser;
