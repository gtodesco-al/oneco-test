type Props = {
  color?: string;
};

export default ({color = '#C2410C'}: Props) => {
  return `
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.125 0.333252H15.125V1.99992H0.125V0.333252ZM0.125 6.16658H10.125V7.83325H0.125V6.16658ZM0.125 11.9999H15.125V13.6666H0.125V11.9999Z" fill="${color}"/>
    </svg>`;
};
