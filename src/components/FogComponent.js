import React, { Component } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

class FogComponent extends Component {
  constructor() {
    super();
    this.vantaRef = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = FOG({
      el: this.vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: 0xb6a574,
      midtoneColor: 0xf5b3a9,
      lowlightColor: 0xa1016,
      baseColor: 0x537dcd,
      blurFactor: 0.6,
      speed: 5.0,
      zoom: 1.5,
    });
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }
  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }} ref={this.vantaRef}>
        {this.props.children}
      </div>
    );
  }
}

export default FogComponent;
