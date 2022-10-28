type Props = {
  color?: string;
};

export default ({color = '#C2410C'}: Props) => {
  return `
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.875 8.83333H7.54167V0.5H0.875V8.83333ZM0.875 15.5H7.54167V10.5H0.875V15.5ZM9.20833 15.5H15.875V7.16667H9.20833V15.5ZM9.20833 0.5V5.5H15.875V0.5H9.20833Z" fill="${color}"/>
    </svg>  
        `;
};
