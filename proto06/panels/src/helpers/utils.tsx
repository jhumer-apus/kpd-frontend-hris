


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