// ALLOWED IMAGE EXTENSIONS
export const IMAGE_EXTs = ['jpg', 'jpeg', 'png', 'webp'];
export const IMAGE_SIZE = 2000000;
export const IMG_SIZE_MSG = 'حجم این عکس باید کمتر از 2MB باشد';
// SERVER DATE FORMAT
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD';
export const CLIENT_DATE_FORMAT = 'jYYYY/jM/jD';
export const COMPLETE_DATE_FORMAT = 'jYYYY-jMM-jDD HH:mm';

// GRID SPACING
export const GRID_SPACING = 4;

// TABLES ROW PER PAGE
export const ROWS_PER_PAGE = 9;

// MONTH NAMES
export const MONTHS = [
  {
    name: 'فروردین',
    id: 1
  },
  {
    name: 'اردیبهشت',
    id: 2
  },
  {
    name: 'خرداد',
    id: 3
  },
  {
    name: 'تیر',
    id: 4
  },
  {
    name: 'مرداد',
    id: 5
  },
  {
    name: 'شهریور',
    id: 6
  },
  {
    name: 'مهر',
    id: 7
  },
  {
    name: 'آبان',
    id: 8
  },
  {
    name: 'آذر',
    id: 9
  },
  {
    name: 'دی',
    id: 10
  },
  {
    name: 'بهمن',
    id: 11
  },
  {
    name: 'اسفند',
    id: 12
  }
];

// HEADER TIME FILTER OPTIONS
export const HEADER_FILTERS = [
  {
    name: 'روز گذشته',
    count: 1,
    type: 'day',
    noRange: true,
    id: 'lastDay'
  },
  {
    name: '7 روز گذشته',
    count: 7,
    type: 'day',
    id: 'last7Days'
  },
  {
    name: 'ماه گذشته',
    count: 1,
    type: 'jMonth',
    id: 'lastMonth'
  },
  {
    name: '3 ماه گذشته',
    count: 3,
    type: 'jMonth',
    id: 'last3Months'
  },
  {
    name: '6 ماه گذشته',
    count: 6,
    type: 'jMonth',
    id: 'last6Months'
  },
  {
    name: 'سال گذشته',
    count: 1,
    type: 'jYear',
    id: 'lastYear'
  }
];
