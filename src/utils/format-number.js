import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return format.replace('.00', '');
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return format.replace('.00', '');
}

export function fPercent(number) {
  const format = number ? numeral(number).format('0.0%') : '';

  return format.replace('.0', '');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return format.replace('.0', '');
}
