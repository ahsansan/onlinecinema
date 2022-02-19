export function getFullTime(timeString) {
  const time = new Date(timeString);
  let month = [
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

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();
  let dayIndex = time.getDay();

  let result = `${weekday[dayIndex]}, ${date} ${month[monthIndex]} ${year}`;

  return result;
}
