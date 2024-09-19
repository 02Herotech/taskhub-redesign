//  format date into backend date

import moment from "moment";

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
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
  const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;

  const notificationDate = new Date(year, month - 1, day, hour, minute, second);
  const now = new Date();

  // Calculate time difference in milliseconds
  const diffTime = notificationDate.getTime() - now.getTime();

  // Calculate differences in units
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 0) {
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return diffSeconds === 0
          ? "now"
          : `in ${Math.abs(diffSeconds)} seconds`;
      }
      return diffMinutes === 1
        ? "in a minute"
        : `in ${Math.abs(diffMinutes)} minutes`;
    }
    return diffHours === 1 ? "in an hour" : `in ${Math.abs(diffHours)} hours`;
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

export function formatDateFromNumberArrayToPastDate(
  dateArray: number[],
): string {
  const [year, month, day, hour, minute, second] = dateArray;

  const notificationDate = new Date(year, month - 1, day, hour, minute, second);
  const now = new Date();

  // Calculate time difference in milliseconds
  const diffTime = now.getTime() - notificationDate.getTime();

  // Calculate differences in units
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 0) {
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return diffSeconds <= 0
          ? "now"
          : `${Math.abs(diffSeconds)} seconds ago`;
      }
      return diffMinutes === 1
        ? "a minute ago"
        : `${Math.abs(diffMinutes)} minutes ago`;
    }
    return diffHours === 1 ? "an hour ago" : `${Math.abs(diffHours)} hours ago`;
  } else if (diffDays === -1) {
    return "yesterday";
  } else if (diffDays < -1 && diffDays > -7) {
    return `${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? "day" : "days"} ago`;
  } else if (diffDays <= -7 && diffDays > -30) {
    const diffWeeks = Math.floor(Math.abs(diffDays) / 7);
    return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffDays <= -30 && diffDays > -365) {
    const diffMonths = Math.floor(Math.abs(diffDays) / 30);
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  } else if (diffDays <= -365) {
    const diffYears = Math.floor(Math.abs(diffDays) / 365);
    return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
  } else {
    return `${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? "day" : "days"} ago`;
  }
}

export function dateFromNumberArray(dateArray: number[]) {
  const [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0] = dateArray;

  // Create a moment object directly from the array components
  const dateMoment = moment([year, month - 1, day, hour, minute, second, millisecond]);

  // Get the current time as a Moment object
  const now = moment();

  // Calculate the difference between the date and now
  const differenceInDays = dateMoment.startOf('day').diff(now.startOf('day'), "days");

  if (differenceInDays === 0) {
    // Today
    return dateMoment.format("[Today at] hh:mm A");
  } else if (differenceInDays === 1) {
    // Tomorrow
    return "Tomorrow";
  } else if (differenceInDays === -1) {
    // Yesterday
    return "Yesterday";
  } else if (differenceInDays > 1 && differenceInDays < 7) {
    // Coming days this week
    return dateMoment.format("dddd");
  } else if (differenceInDays < -1 && differenceInDays > -7) {
    // Past days this week
    return dateMoment.format("dddd");
  } else if (differenceInDays >= 7 || differenceInDays <= -7) {
    // This month or later/earlier
    return dateMoment.format("MMM D");
  } else {
    // Earlier or later years
    return dateMoment.format("YYYY-MM-DD");
  }
}
type DateInput = number[] | { year: number; month: number; day: number };
type TimeInput = number[] | { hour: number; minute: number; second?: number; nano?: number };

export function dateFromArrays(startDate: DateInput, startTime: TimeInput) {
  let year: number, month: number, day: number;
  let hour: number, minute: number, second: number = 0, nano: number = 0;

  // Process startDate
  if (Array.isArray(startDate)) {
    [year, month, day] = startDate;
  } else {
    ({ year, month, day } = startDate);
  }

  // Process startTime
  if (Array.isArray(startTime)) {
    [hour, minute, second = 0, nano = 0] = startTime;
  } else {
    ({ hour, minute, second = 0, nano = 0 } = startTime);
  }

  // Create a JavaScript Date object from the date and time components
  const dateObject = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    Math.floor(nano / 1e6), // convert nanoseconds to milliseconds
  );

  // Create a Moment object from the date
  const timestampMoment = moment(dateObject);

  // Get the current time as a Moment object
  const now = moment();

  // Normalize the moments to ignore the time for comparison purposes
  const startOfToday = now.clone().startOf('day');
  const startOfGivenDay = timestampMoment.clone().startOf('day');

  // Calculate the difference between now and the timestamp in full days
  const differenceInDays = startOfGivenDay.diff(startOfToday, 'days');

  if (differenceInDays === 0) {
    // Today
    return timestampMoment.format("[Today at] hh:mm A");
  } else if (differenceInDays === 1) {
    // Tomorrow
    return timestampMoment.format("[Tomorrow at] hh:mm A");
  } else if (differenceInDays === -1) {
    // Yesterday
    return `Yesterday`;
  } else if (differenceInDays < 0 && differenceInDays > -7) {
    // This week in the past
    return timestampMoment.from(now);
  } else if (differenceInDays > 0 && differenceInDays < 7) {
    // This week in the future
    return timestampMoment.from(now);
  } else if (differenceInDays < 30 && differenceInDays >= 7) {
    // This month
    return timestampMoment.format("MMM D");
  } else if (differenceInDays >= 30 && differenceInDays < 365) {
    // This year
    return timestampMoment.format("MMM D");
  } else {
    // Earlier years
    return timestampMoment.format("YYYY-MM-DD");
  }
}

export function formatRelativeDate(timestampArray: number[]): string {
  const [year, month, day, hour = 0, minute = 0, second = 0] = timestampArray;
  const now = new Date();
  const timestamp = new Date(year, month - 1, day, hour, minute, second);

  const elapsedMilliseconds = now.getTime() - timestamp.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000 - 3600);

  if (elapsedSeconds < 60) {
    return "now";
  } else if (elapsedSeconds < 3600) {
    const minutesAgo = Math.floor(elapsedSeconds / 60);
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (elapsedSeconds < 86400) {
    const hoursAgo = Math.floor(elapsedSeconds / 3600);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (elapsedSeconds < 2592000) {
    const daysAgo = Math.floor(elapsedSeconds / 86400);
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else {
    const monthsAgo = Math.floor(elapsedSeconds / 2592000);
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  }
}

export const arrayToDate = (arr: number[]) => {
  const [year, month, day, hour, minute, second] = arr;
  return new Date(year, month - 1, day, hour, minute, second);
};
export const isToday = (arr: number[]) => {
  const date = arrayToDate(arr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const isThisWeek = (arr: number[]) => {
  const date = arrayToDate(arr);
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (arr: number[]) => {
  const date = arrayToDate(arr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
};

export const isOlder = (arr: number[]) => {
  const date = arrayToDate(arr);
  const today = new Date();
  const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));

  return date < oneMonthAgo;
};

// Format time using moment.js
export function formatTime(timestamp: string) {
  const formattedTime = moment(timestamp).format("hh:mm A");
  return formattedTime;
}

export function formatTimestamp(timestamp: number[]): string {
  const [year, month, day, hour, minute, second, nanosecond] = timestamp;

  // Create a JavaScript Date object from the timestamp array
  const dateObject = new Date(
    year,
    month - 1,
    day,
    hour + 1,
    minute,
    second,
    Math.floor(nanosecond / 1e6),
  ); // convert nanoseconds to milliseconds

  // Create a Moment object from the date
  const timestampMoment = moment(dateObject);

  // Get the current time as a Moment object
  const now = moment();

  // Calculate the difference between now and the timestamp
  const differenceInDays = now.diff(timestampMoment, "days");

  if (differenceInDays === 0) {
    // Today
    return timestampMoment.format("hh:mm A");
  } else if (differenceInDays === 1) {
    // Yesterday
    return `Yesterday at ${timestampMoment.format("hh:mm A")}`;
  } else if (differenceInDays < 7) {
    // This week
    return timestampMoment.from(now);
  } else if (differenceInDays < 30) {
    // This month
    return timestampMoment.format("MMM D [at] hh:mm A");
  } else if (differenceInDays < 365) {
    // This year
    return timestampMoment.format("MMM D [at] hh:mm A");
  } else {
    // Earlier years
    return timestampMoment.format("YYYY-MM-DD [at] hh:mm A");
  }
}
