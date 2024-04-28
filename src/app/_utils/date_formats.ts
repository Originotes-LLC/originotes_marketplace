const options: Intl.DateTimeFormatOptions = {
  // weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formattedDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
