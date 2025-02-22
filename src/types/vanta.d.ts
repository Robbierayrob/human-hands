declare module 'vanta/src/vanta.halo' {
  const HALO: (options: {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    xOffset?: number;
  }) => {
    destroy: () => void;
  };
  
  export default HALO;
}
