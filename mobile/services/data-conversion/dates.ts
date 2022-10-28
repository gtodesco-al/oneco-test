export const processAPIToHumanDate = (apiDate: string | undefined | null) => {
  let humanDate: string | undefined;
  console.log('apiDate:', apiDate);
  if (apiDate) {
    const yyyy = apiDate.substring(0, 4);
    const mm = apiDate.substring(5, 7);
    const dd = apiDate.substring(8, 10);

    humanDate = `${mm}/${dd}/${yyyy}`;
  }
  return humanDate;
};

export const processHumanDateToAPI = (humanDate: string | undefined | null) => {
  let apiDate: string | undefined;
  if (humanDate) {
    const mm = humanDate.substring(0, 2);
    const dd = humanDate.substring(2, 4);
    const yyyy = humanDate.substring(4, 8);

    apiDate = `${yyyy}-${mm}-${dd}`;
  }
  return apiDate;
};
