const pad = number => {
  return number < 10 ? `0${number}` : number;
};

export const currentTime = currentDate => {
  return `${currentDate.getHours()}:${pad(currentDate.getMinutes())}`;
};

export const twelveHours = () => {
  const oneMinute = 60000;
  const oneHour = oneMinute * 60;
  return oneHour * 12;
};

export const oneSecond = () => {
  return 1000;
};

export const tenSeconds = () => {
  return 10000;
};
