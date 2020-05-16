export const getIndex = (weekday, hour) => weekday * 100 + hour;

export const getDay = (index) => Math.floor(index / 100);

export const getHour = (index) => index % 100;
