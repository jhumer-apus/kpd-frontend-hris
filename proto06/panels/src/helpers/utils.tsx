import dayjs, {ConfigType} from "dayjs";


// It takes an object and an optional prefix string as arguments.
// It reduces the input object into a new object that is flat (no nested objects).
// For each key in the input object, it checks if the corresponding value is an object.
// If the value is an object, it recursively calls flatten on the value, prepending the current key to the prefix.
// If the value is not an object, it adds the key-value pair to the accumulated object, prepending the current key to the prefix.
// It returns the accumulated object, which is flat.

export const flattenObject = (obj: any, prefix = ''): any => {
    return Object.keys(obj).reduce((acc: {[key: string]: any}, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !(obj[k] instanceof Date)) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
}


// totalDays represents the number of days you want to convert, considering 8 working hours per day. 
// The function convertDaysToHHMM() is used to convert the days into the hh:mm format based on the 
// assumption of 8 working hours per day. The resulting formatted time is then displayed 
// in the component.

export const convertDaysToHHMM = (days: number): string => {
  const workingHoursPerDay = 8;
  const totalMinutes = Math.floor(days * workingHoursPerDay * 60);

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minsString = mins.toString().padStart(2, '0');

  return `${hoursString}:${minsString}`;
}

// This function takes the minutes as input and performs the following steps:
// Divides the total minutes by 60 to get the hours.
// Calculates the remaining minutes by taking the modulus (remainder) of the total minutes divided by 60.
// Converts the hours and minutes into string format using toString().
// Pads the hours and minutes strings with leading zeros using padStart() to ensure a consistent format.
// Returns the formatted string in the hh:mm format.

export const convertMinutesToHHMM = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minsString = mins.toString().padStart(2, '0');

  return `${hoursString}:${minsString}`;
}

// If the truncated string is longer than the limit, 
// the function searches for the last occurrence of a space character (' ') 
// within the limit and removes everything after that.

export const limitString = (str: string): string => {
  const maxLength = 18;
  let limitedString = str.substring(0, maxLength);

  // Trim any trailing spaces if the string is longer than the limit
  if (limitedString.length > maxLength) {
    let lastSpaceIndex = limitedString.lastIndexOf(' ');
    limitedString = limitedString.substring(0, lastSpaceIndex);
  }

  return limitedString;
}


// Function to compute the duration in hours between two dates
export const computeDurationInHours = (start: ConfigType, end: ConfigType): number => {
  const startTime = dayjs(start);
  const endTime = dayjs(end);
  const durationInMilliseconds = endTime.diff(startTime);
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
  return Math.abs(durationInHours);
};



/* 
How to use: 
const jsonString = '{"obt_total_hours":["This field is required."]}';
const jsonObject = JSON.parse(jsonString);
const beautifiedOutput = beautifyJSON(jsonObject);
console.log(beautifiedOutput);
Expected Output: obt total hours : This field is required.

*/ 
export function beautifyJSON(jsonObj: any) {
  let beautifiedString = '';
  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) {
      const formattedKey = key.replace('_', ' ');
      const value = typeof jsonObj[key] === 'string' ? jsonObj[key] : jsonObj[key][0];
      beautifiedString += `${formattedKey} : ${value}\n`;
    }
  }
  return beautifiedString.trim();
}