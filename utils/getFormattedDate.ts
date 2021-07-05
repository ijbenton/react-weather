var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function getFormattedDate(d: Date) {
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const day = days[d.getDay()];
  let hr: string | number = d.getHours();
  let min: string | number = d.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  let ampm = 'am';
  if (hr > 12) {
    hr -= 12;
    ampm = 'pm';
  }
  return (
    day + ' ' + hr + ':' + min + ampm + ' ' + date + ' ' + month + ' ' + year
  );
}
