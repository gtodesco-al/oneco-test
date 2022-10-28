type Props = {
  color?: string;
};

export default ({color = '#0369A1'}: Props) => {
  return `
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_644_3496)">
      <path d="M2 31C2 14.4315 15.4315 1 32 1C48.5685 1 62 14.4315 62 31C62 47.5685 48.5685 61 32 61C15.4315 61 2 47.5685 2 31Z" fill="${color}"/>
      <path d="M30.6666 29.6667V21.6667H33.3333V29.6667H41.3333V32.3334H33.3333V40.3334H30.6666V32.3334H22.6666V29.6667H30.6666Z" fill="white"/>
    </g>
  </svg>`;
};
