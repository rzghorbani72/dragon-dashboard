/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-debugger */
import moment from 'moment-jalaali';
import {
  SERVER_DATE_FORMAT,
  CLIENT_DATE_FORMAT,
  IMAGE_EXTs,
  IMAGE_SIZE,
  IMG_SIZE_MSG
} from 'src/config/constants';
import { isArray } from 'lodash';

const JalaliMoment = require('moment-jalaali');

/**
 * @SEE https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
 * finds the max value for a specified property
 * @param {Array.<Object>} arr
 * @param {String} prop
 */
const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
export const fixNumbers = (str) => {
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};
export const errorParserMessage = (res) => {
  const msg =
    res.response?.data?.message?.message || res.response?.data?.message || res.response.data.name;
  return msg;
};
export function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
export const safeInteger = (number) => {
  if (isFloat(number)) {
    return Number(number).toFixed(2);
  }
  return number;
};
export const findMax = (arr, prop) => {
  let max = arr[0]?.[prop];

  // with very large arrays of 4000 items or more,
  // a for loop is the fastest method by far,
  // so keep that in mind. It may be ugly, but it works.

  for (let i = 0; i < arr.length; i++) {
    const currValue = arr[i]?.[prop];
    if (currValue > max) max = currValue;
  }

  return max;
};

export const findMin = (arr, prop) => {
  let min = arr[0]?.[prop];

  for (let i = 0; i < arr.length; i++) {
    const currValue = arr[i]?.[prop];
    if (currValue < min) min = currValue;
  }

  return min;
};

/**
 *
 * @param {String} str
 */
export const isMobileNumber = (str = '') => /^(\+98|0)?9\d{9}$/.test(str.trim());

/**
 *
 * @param {String} str
 */
export const isPhoneNumber = (str = '') => /^(\+98|0)?[1-8]{2}\d{8}$/.test(str.trim());

/**
 *
 * @param {String} str
 */
export const isShebaNumber = (str = '') => /^(?:IR)(?=.{24}$)[0-9]*$/.test(str.trim());

/**
 *
 * @param {String} email
 */
export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
};

/**
 *
 * @param {String} time
 */
export const isValidTime = (time) => {
  // HH:MM:SS
  // for 24-hour time, leading zeroes mandatory
  const regex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
  return regex.test(time.trim().toLowerCase());
};

/**
 * Thousand seperator
 * @param {Number} n
 */
export const formatNumber = (n, acceptNegative = false) => {
  if (!n) n = 0;

  if (Number.isInteger(n)) return n;

  if (!acceptNegative) n = Math.abs(n);

  return Number(n).toLocaleString();
};

/**
 * receives string date and returs a specified hijri format of that date
 * @param {String} str
 */
export const formatDate = (str = '') => {
  if (moment(str).isValid()) return moment(str).format(CLIENT_DATE_FORMAT);

  return str;
};

/**
 * receives string date and returs a specified hijri format of that date
 * @param {String} str
 */
export const formatTimeOutOfDate = (str = '') => {
  if (moment(str).isValid()) return moment(str).format('HH:mm');

  return str;
};

export const formatDateInReverse = (str = '') => {
  if (moment(str, CLIENT_DATE_FORMAT).isValid())
    return moment(str, CLIENT_DATE_FORMAT).format(SERVER_DATE_FORMAT);

  return str;
};

/**
 *
 * @param {String} d1
 * @param {String} d2
 */
export const compareDates = (d1, d2) =>
  moment(d1, SERVER_DATE_FORMAT).isSameOrBefore(moment(d2, CLIENT_DATE_FORMAT));

export const isDateAfter = (d1, d2) =>
  moment(d1, SERVER_DATE_FORMAT).isAfter(moment(d2, SERVER_DATE_FORMAT));

export const isDateBefore = (d1, d2) =>
  moment(d1, SERVER_DATE_FORMAT).isBefore(moment(d2, SERVER_DATE_FORMAT));

/**
 * check the str to see if its of format M/D/YYYY
 * @param {String} d
 */
export const isValidServerDateFormat = (d) => {
  const regex = /\d{4}-\d{1,2}-\d{1,2}/;
  // eslint-disable-next-line no-restricted-globals
  return regex.test(d) || (Number.isInteger(Number(d)) && !Number.isInteger(Date.parse(d)));
};

/**
 * will return the visible data based on perPage and page values
 * @param {Array} data
 * @param {Number} page
 * @param {Number} perPage
 */
export const getRowsPerPage = (data = [], page, perPage) => {
  if (isArray(data)) return data.slice((page - 1) * perPage, (page - 1) * perPage + perPage);
};
/**
 *
 * @param {(Number | String)} n
 */
export const parseToNumber = (n) => Number(n);

export const isOnTheSameMonth = (d, month) => {
  const dMonth = moment(d, SERVER_DATE_FORMAT).jMonth();
  return dMonth + 1 === Number(month);
};

export const isOnTheSameDay = (d, day) => {
  const dDay = moment(d).jDate();
  return dDay === Number(day);
};

/**
 * returns true if the given date is between the (today - monthArray upper range) and (today - monthArray lower range)
 * @param {String} d
 * @param {Array} monthsArr
 */
export const isBetweenTodayAndMonthAgo = (d, monthsArr) => {
  const dMoment = moment(d, SERVER_DATE_FORMAT);

  return (
    dMoment.isSameOrAfter(moment().subtract(monthsArr[1], 'jMonth')) &&
    dMoment.isSameOrBefore(moment().subtract(monthsArr[0], 'jMonth'))
  );
};

const CURRENCY_ABBREV = [
  [1000000000, 'میلیارد'],
  [1000000, 'میلیون']
];

/**
 * return a string composed of the abbreviated value along with its currency
 * @param {Number} value
 */
export const getCurrencyAbbrev = (value = 0) => {
  if (value === 0) return value;

  let curr = 'تومان';
  let val = value;

  for (let i = 0; i < CURRENCY_ABBREV.length; i++)
    if (value % CURRENCY_ABBREV[i][0] === 0) {
      curr = CURRENCY_ABBREV[i][1];
      val = value / CURRENCY_ABBREV[i][0];
      break;
    }

  return `${formatNumber(val)} ${curr}`;
};

export function GregorianToJalali(date, format, size, formatTo) {
  if (date && String(date)) {
    if (size === 'small')
      return JalaliMoment(date, format || 'YYYY-MM-DD HH:mm:ss').format(
        formatTo || 'jYYYY-jMM-jDD'
      );

    return JalaliMoment(date, format || 'YYYY-MM-DD HH:mm:ss').format(
      formatTo || 'jYYYY-jMM-jDD HH:mm'
    );
  }
}

export function handleApiResponse(res) {
  // if (parseInt(res.status / 100) === 2) {
  //     return { status: 'success', msg: '' };
  // }
  if (!res) return { status_name: 'error', msg: 'مشکلی پیش آمده دوباره تلاش کنید.' };

  if (res.status === 400) return { status_name: 'error', data: res.data };

  if (res.status === 423)
    return {
      status_name: 'error',
      msg: 'این آیتم دارای وابستگی هایی میباشد، ابتدا آنها حذف نمایید.'
    };

  if (res.status === 401) return { status_name: 'error', msg: 'شما دسترسی برای تغییر ندارید' };

  if (res.status === 404) return { status_name: 'error', msg: 'یافت نشد' };

  if (res.status === 500) return { status_name: 'error', msg: 'خطا در گرفتن اطلاعات' };

  if (res.status === 502)
    return {
      status_name: 'error',
      msg: 'سایت در حال تعمیر لطفا لحظاتی بعد دوباره امتحان کنید'
    };

  if (res.status === 503)
    return { status_name: 'error', msg: 'این سرویس در حال حاضر در دسترس نیست' };

  if (res.status === 504)
    return {
      status_name: 'error',
      msg: 'پاسخی از سرور دریافت نشد لطفا دوباره امتحان کنید'
    };

  return { status_name: 'error', msg: res.data.detail };
}

export const validateImageFile = (file) => {
  const fileName = file.name;
  const dotIndex = fileName.lastIndexOf('.');
  const fileExt = fileName.substring(dotIndex + 1);

  if (!IMAGE_EXTs.includes(fileExt.toLowerCase())) return 'فایل آپلود شده عکس نمیباشد.';

  if (file.size > IMAGE_SIZE) return IMG_SIZE_MSG;
};

export const cartesian = (a) =>
  a.reduce(
    (a, b) =>
      a.flatMap((d) => {
        if (b.length) return b.map((e) => [d, e].flat());

        return [d];
      }),
    [[]]
  );

export const isIntegerValue = (val) => {
  const re = /^[0-9\b]+$/;
  return val === '' || re.test(val);
};

export const daysRemaining = (d) => {
  const eventdate = moment(d, SERVER_DATE_FORMAT);
  const todaysdate = moment();

  return eventdate.diff(todaysdate, 'days');
};

/**
 *
 * @param {Number} n
 * @returns Number with maximum 2 decimal numbers if necessary
 */
export const toTwoDecimalNumbers = (n) => Math.round(parseFloat(n) * 100 + Number.EPSILON) / 100;

/**
 *
 * @returns List of the last seven days
 */
export function Last7Days() {
  const result = [];

  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(moment(d).format('jD jMMMM'));
  }

  return result;
}

/**
 *
 * @param {String} code
 * @returns a boolean indicating whether the input is valid or not
 * @SEE https://gist.github.com/ebraminio/5292017
 */
export function isValidIranianNationalCode(code) {
  if (!/^\d{10}$/.test(code)) return false;

  const check = +code[9];
  let sum = 0;
  let i;
  for (i = 0; i < 9; ++i) {
    sum += +code[i] * (10 - i);
  }
  sum %= 11;

  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}
