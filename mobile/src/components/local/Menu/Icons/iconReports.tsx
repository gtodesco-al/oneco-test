type Props = {
  color?: string;
};

export default ({color = '#C2410C'}: Props) => {
  return `
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.375 9.00008H3.70833V16.5001H0.375V9.00008ZM12.0417 5.66675H15.375V16.5001H12.0417V5.66675ZM6.20833 0.666748H9.54167V16.5001H6.20833V0.666748Z" fill="${color}"/>
    </svg>`;
};
