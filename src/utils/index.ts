//  format date into backend date

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// format time into backend time

export const formatTime = (time: string): string => {
  const [hour, minute] = time.split(":");
  let hourNum = parseInt(hour, 10);
  const ampm = hourNum >= 12 ? "PM" : "AM";
  hourNum = hourNum % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)
  const hourString = String(hourNum).padStart(2, "0"); // Ensure the hour has two digits
  const minuteString = String(minute).padStart(2, "0"); // Ensure the minute has two digits
  return `${hourString}:${minuteString} ${ampm}`;
};

export const formatDateAsYYYYMMDD = (inputDate: string | Date): string => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
