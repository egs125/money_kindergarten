
export function trimMonth(month) {
  let result = '';

  if (month) {
    result = month.substr(0, 1) === '0' ? month.substr(1, 1) : month;
  }

  return result;
};

export function addComma(number) {

};
