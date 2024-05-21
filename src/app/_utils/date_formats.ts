const options: Intl.DateTimeFormatOptions = {
  // weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formattedDate = (date: string) => {
  console.log("date: ", date);
  if (!date)
    throw new Error(
      "A valid date is required to format it properly. Please provide a valid date."
    );
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
