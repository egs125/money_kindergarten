
export function trimMonth(month) {
  let result = '';

  if (month) {
    result = month.substr(0, 1) === '0' ? month.substr(1, 1) : month;
  }

  return result;
};

export function addComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function convertPropertyData(obj, name, defaultValue) {
  let returnValue = defaultValue;

  if (obj[name]) {
    returnValue = obj[name];
  }

  return returnValue;
}