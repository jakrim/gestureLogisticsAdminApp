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
  if (string !== undefined && string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

export const lowercaseLetter = (string) => {
  if (string !== undefined) {
    return string.charAt(0).toLowerCase() + string.slice(1);
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

export const mapCities = (citiesArr) => {
  let capitalizeCities = [];

  for (var city of citiesArr) {
    capitalizeCities.push(capitalizeLetter(city));
  }
  capitalizeCities.push(
    capitalizeCities
      .find((el) => el === 'Washingtondc')
      .replace('Washingtondc', 'Washington DC')
  );
  capitalizeCities.push(
    capitalizeCities
      .find((el) => el === 'Lasvegas')
      .replace('Lasvegas', 'Las Vegas')
  );
  capitalizeCities.push(
    capitalizeCities
      .find((el) => el === 'Lasvegas')
      .replace('Lasvegas', 'Los Angeles')
  );
  capitalizeCities.push(
    capitalizeCities
      .find((el) => el === 'Sanfrancisco')
      .replace('Sanfrancisco', 'San Francisco')
  );

  let finalCities = capitalizeCities.filter(
    (el) =>
      el !== 'Washingtondc' &&
      el !== 'Lasvegas' &&
      el !== 'Losangeles' &&
      el !== 'Sanfrancisco'
  );

  return finalCities;
};

// export const mapOrderCities = (ordersArr) => {
//   // console.log('mapOrderCities -> ordersArr', ordersArr);
//   let fixedCities = [];

//   // let mapped = ordersArr.map((el) => capitalizeLetter(el.city));

//   for (var order of ordersArr) {
//     console.log('mapOrderCities -> ordersArr', ordersArr[order]);

//     if (ordersArr[order].city !== null && ordersArr[order].city !== undefined) {
//       ordersArr[order].city = capitalizeLetter(ordersArr[order].city);
//     }

//     fixedCities.push(order);
//     console.log('fixedCities', fixedCities);
//     return fixedCities;
//   }
// };

export const makeLowercaseCities = (citiesArr) => {
  if (citiesArr.length === 0) {
    return;
  } else {
    let mappedCitiesArr = [];
    for (let city of citiesArr) {
      if (city.indexOf(' ') >= 0) {
        // let stringArr = [];
        let newStr = city.split(' ');
        let cityArr = newStr.map((str) => lowercaseLetter(str));
        let oneWordCity = cityArr[0].concat(cityArr[1]);
        mappedCitiesArr.push(oneWordCity);
      } else {
        mappedCitiesArr.push(lowercaseLetter(city));
      }

      return mappedCitiesArr;
    }
  }
};

export const createCitySelectorState = (citiesArr) => {
  let finalObj = {};
  let listKeys = [];
  for (var city of citiesArr) {
    let cityObj = {};
    cityObj.key = city;
    cityObj.switch = false;
    listKeys.push(cityObj);
  }

  finalObj.listKeys = listKeys;
  return finalObj;
};
