// import store from '../store';

var moment = require('moment-timezone');

export const MillisToDate = (milliseconds) => {
  var scheduleDate = new Date(parseInt(milliseconds));
  var myTimezone = 'America/Toronto';
  var myDatetimeFormat = 'hh:mma z MM/DD';
  var myDatetimeString = moment(scheduleDate)
    .tz(myTimezone)
    .format(myDatetimeFormat);

  return myDatetimeString;
};

export const MillisToTime = (milliseconds) => {
  let h, m, s;
  h = Math.floor(milliseconds / 1000 / 60 / 60);
  m = Math.floor((milliseconds / 1000 / 60 / 60 - h) * 60);
  s = Math.floor(((milliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60);

  s < 10 ? (s = `0${s}`) : (s = `${s}`);
  m < 10 ? (m = `0${m}`) : (m = `${m}`);
  h < 10 ? (h = `0${h}`) : (h = `${h}`);

  return `${s}:${m}:${h}`;
};

export const capitalizeLetter = (string) => {
  if (string !== undefined) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

export const properTimeFunc = (ordersArr) => {
  let properTimeArr = [];

  for (order of ordersArr) {
    var proper_time = order.proper_time;
    // if schedule is null
    if (order.schedule === null) {
      // time order placed + 1 hr
      proper_time = order.time_order_placed + 3600000;
    } else {
      proper_time = order.schedule;
    }
    order['proper_time'] = proper_time;
    properTimeArr.push(order);
  }

  return properTimeArr;
};
