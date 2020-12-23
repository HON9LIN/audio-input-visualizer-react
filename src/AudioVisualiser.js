import React  from 'react';

export default function AudioVisualiser(props) {
  const canvas = React.useRef(null);

  const draw = () => {
    if (!canvas.current) { return; }
    const height = canvas.current.height;
    const width = canvas.current.width;
    const context = canvas.current.getContext('2d');
    const displayCount = props.audioData.length;
    const sliceWidth = (width * 1.0) / displayCount;

    let x = 0;
    context.lineWidth = 2;
    context.strokeStyle = '#29a98b';
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < displayCount; i ++) {
      context.beginPath();
      const y = ((props.audioData[i] - 128) / 255.0) * height;
      context.moveTo(x, height / 2 - Math.abs(y));
      context.lineTo(x, height / 2 + Math.abs(y));
      context.stroke();
      x += sliceWidth;
    }
  }
  draw();

  return <canvas width={props.width} height={props.height} ref={canvas} />;
}
