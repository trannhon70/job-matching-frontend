export function isInputDateMoreThanSpecifiedMinutesPastCurrentDate(
  inputDate: Date,
  minutes: number,
): boolean {
  const currentDate = new Date();
  const minutesInMilliseconds = minutes * 60 * 1000;

  return currentDate.getTime() - inputDate.getTime() > minutesInMilliseconds;
}

export function convertTimestampToHourAndMinute(timestamp: number): {
  hour: number;
  minute: number;
} {
  const dateObject = new Date(timestamp);
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();

  return { hour, minute };
}
