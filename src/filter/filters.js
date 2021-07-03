import dayjs from 'dayjs';

/* 金钱三位一逗号 */
export function toThousandFilter(num) {
  return (Number(num) || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/* 银行卡四位一空格 */
export function fourSpace(val) {
  return (Number(val) || 0)
    .toString()
    .replace(/\s/g, '')
    .replace(/(.{4})/g, '$1 ');
}

/* 电话号码过滤，188****7983 */
export function telFormat(tel) {
  return (Number(tel) || 0).toString().replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');
}

/* 身份证号格式化 前四位 后四位 中间变为星号 ---例如：3408*******5656 */
export function cardFormat(card) {
  return (Number(card) || 0).toString().replace(/^(.{4})(?:\d+)(.{4})$/, '$1*******$2');
}

/* 时间格式化 yyyy-MM-dd hh:mm:ss */
export function timeFormat(time) {
  if (!time) {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
