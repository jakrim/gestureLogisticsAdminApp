import React from 'react';

var moment = require('moment-timezone');

const MillisToDate = milliseconds => {
  var scheduleDate = new Date(milliseconds);
  var myTimezone = 'America/Toronto';
  var myDatetimeFormat = 'hh:mma z MM/DD';
  var myDatetimeString = moment(scheduleDate)
    .tz(myTimezone)
    .format(myDatetimeFormat);

  return myDatetimeString;
};

export default MillisToDate;
