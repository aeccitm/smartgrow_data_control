const nombresMesAbreviados = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const formatDateValue = (value) => (value < 10 ? `0${value}` : `${value}`);

const formatDateTime = (date) => {
  const formattedDate = `${formatDateValue(date.getDate())} ${
    nombresMesAbreviados[date.getMonth()]
  } ${date.getFullYear()}`;

  const formattedHour = `${formatDateValue(date.getHours())}:${formatDateValue(
    date.getMinutes()
  )}`;

  return { formattedDate, formattedHour };
};

export { formatDateTime };
