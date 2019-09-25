const pad = number => {
  return number < 10 ? `0${number}` : number;
};

export const currentTime = currentDate => {
  return `${currentDate.getHours()}:${pad(currentDate.getMinutes())}`;
};

export const oneMinute = () => {
  return 60000;
};
export const oneSecond = () => {
  return 1000;
};
export const tenSeconds = () => {
  return 10000;
};

export const thirtySeconds = () => {
  return tenSeconds() * 3;
};

export const tenMinutes = () => {
  return oneMinute() * 10;
};

export const twelveHours = () => {
  const oneHour = oneMinute() * 60;
  return oneHour * 12;
};
