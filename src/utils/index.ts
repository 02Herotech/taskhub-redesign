//  format date into backend date

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// format time into backend time
export const formatTimeFromDate = (date: Date): string => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const hourNum = hour % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)
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

export function formatDateFromNumberArray(dateArray: number[]) {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // JavaScript Date object

  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"; // because 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${day}${daySuffix(day)} ${monthNames[month - 1]} ${year}`;
}

export function formatDateFromNumberArrayToRelativeDate(
  dateArray: number[],
): string {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // JavaScript Date object
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "tomorrow";
  } else if (diffDays === -1) {
    return "yesterday";
  } else if (diffDays > 1 && diffDays < 7) {
    return `in ${diffDays} days`;
  } else if (diffDays < -1 && diffDays > -7) {
    return `${Math.abs(diffDays)} days ago`;
  } else if (diffDays >= 7 && diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `in ${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"}`;
  } else if (diffDays <= -7 && diffDays > -30) {
    const diffWeeks = Math.floor(Math.abs(diffDays) / 7);
    return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffDays >= 30 && diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `in ${diffMonths} ${diffMonths === 1 ? "month" : "months"}`;
  } else if (diffDays <= -30 && diffDays > -365) {
    const diffMonths = Math.floor(Math.abs(diffDays) / 30);
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  } else if (diffDays >= 365) {
    const diffYears = Math.floor(diffDays / 365);
    return `in ${diffYears} ${diffYears === 1 ? "year" : "years"}`;
  } else {
    const diffYears = Math.floor(Math.abs(diffDays) / 365);
    return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
  }
}
