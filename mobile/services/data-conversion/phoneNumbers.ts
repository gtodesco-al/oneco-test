const convertPhoneNumber = (phoneNumber?: string) => {
  if (phoneNumber) {
    const USPhoneNumber = phoneNumber?.match(/(\d{3})(\d{3})(\d{4})/);

    return USPhoneNumber
      ? `(${USPhoneNumber[1]}) ${USPhoneNumber[2]}-${USPhoneNumber[3]}`
      : '-';
  }

  return;
};

export default convertPhoneNumber;
