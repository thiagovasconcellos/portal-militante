export function isValidEmail(email: string): boolean {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email)
}

export function currency(value: number, withoutFraction = false): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: withoutFraction ? 0 : 2,
  }).format(value);
}

export function kFormatter(num: number): any {
  return Math.abs(num) > 999
    ? Math.sign(num) * <any>(Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((i) => num >= i.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};