import { Component, type ReactNode } from "react";

/**
 * Error boundary for decorative WebGL/animation layers. If an effect throws
 * (missing WebGL, shader failure), the site must render without it — a lost
 * particle field is atmosphere; a crashed React tree is a black screen.
 */
class EffectBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default EffectBoundary;
