export function centsToDollars(amount = 0, clipZeroes = true) {
  const locale = 'en-US';
  const options = { style: 'currency', currency: 'USD' };
  let dollars = Intl.NumberFormat(locale, options).format(amount / 100);

  if (clipZeroes) {
    dollars = dollars.replace(/\.00$/, '');
  }

  return dollars;
}
