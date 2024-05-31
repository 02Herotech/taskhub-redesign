// reduce text length
export const truncateText = (text: string, length: number) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.slice(0, length) + " ...";
};

export function formatDate(dateArray: number[]) {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // month is zero-based in JavaScript Date

  // Helper functions
  const getDayName = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = [
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
    return months[date.getMonth()];
  };

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`; // Handle 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const dayName = getDayName(date);
  const monthName = getMonthName(date);
  const dayWithSuffix = getDayWithSuffix(day);

  return `On ${dayName}, ${monthName} ${dayWithSuffix}`;
}
