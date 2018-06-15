import {genImageUrl} from './browser';
import {Config} from '../config';

declare var _MEIQIA: any;

export interface GalleryItem {
  /**
   * 远程网址
   *
   * @type {string}
   */
  url?: string;
  /**
   * JavaScript File 对象
   *
   * @type {File}
   */
  file?: File;
  /**
   * 文件标题
   *
   * @type {string}
   */
  title?: string;
  /**
   * 是否允许删除
   *
   * @type {boolean}
   * @default true
   */
  canDelete?: boolean;
}

const isCn = function (str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return false;
  }
  return true;
};

// 美恰在线客服
export function getMeiqia() {
  (function (m, ei, q, i, a, j, s) {
    m[i] = m[i] || function () {
      (m[i].a = m[i].a || []).push(arguments);
    };
    j = ei.createElement(q),
      s = ei.getElementsByTagName(q)[0];
    j.async = true;
    j.charset = 'UTF-8';
    j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
    s.parentNode.insertBefore(j, s);
  })(window, document, 'script', '_MEIQIA');
  _MEIQIA('entId', 27864);
  _MEIQIA('fallback', 1);
  _MEIQIA('withoutBtn');
}

export function formData(body: object): FormData {
  const _formData: FormData = new FormData();
  for (const kn in body) {
    if (body) {
      _formData.append(kn, body[kn] === undefined ? '' : body[kn]);
    }
  }
  return _formData;
}

export function formDataToUrl(body: object): string {
  let str = '';
  for (const keyName in body) {
    if (!str) {
      str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    } else {
      str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    }
  }
  return str;
}

export function formDataToUrlNoEncode(body: object): string {
  let str = '';
  for (const keyName in body) {
    if (!str) {
      str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : body[keyName]);
    } else {
      str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : body[keyName]);
    }
  }
  return str;
}

export function getIndex(jsonArray, keyName, value) {
  for (let i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i][keyName] === value) {
      return i;
    }
  }
}

export function getCnNum(num) {
  num = '' + num;
  const cnNumArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit_a = ['', '十', '百', '千'];
  const unit_b = ['', '万', '亿', '兆'];

  const numArr = num.split('');
  const _numArr = [];

  for (let i = numArr.length - 1; i >= 0; i--) {
    _numArr.push(numArr[i]);
  }


  let zero = '';
  let result = '';
  let i4 = -1;
  _numArr.forEach(function (n, i) {
    if (i % 4 === 0) {// 首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
      i4++;
      result = unit_b[i4] + result; // 将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
      zero = ''; // 在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空
    }

    // 关于0的处理与判断。
    if (_numArr[i] === '0') {// 如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
      switch (i % 4) {
        case 0:
          break;
        // 如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
        case 1:
        case 2:
        case 3:
          if (_numArr[i - 1] !== '0') {
            zero = '零';
          }// 如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
          break;

      }

      result = zero + result;
      zero = '';
    } else {// 如果不是“0”
      result = cnNumArr[parseInt(_numArr[i], 10)] + unit_a[i % 4] + result; // 就将该当字符转换成数值型,并作为数组cnNumArr的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
    }
  });
  if (result.indexOf('零') === 0) {
    result = result.substr(1);
  }// 处理前面的0

  return result;
}

export function parseImgs(images) {
  let imgs = images;
  if (Array.isArray(imgs)) {
    if (imgs.length > 0) {
      if (typeof imgs[0] === 'string') {
        imgs = (<string[]>imgs).map((url: string) => {
          return {url: url};
        });
      } else {
        imgs = (<GalleryItem[]>imgs).map((item: GalleryItem) => {
          if (item.file) {
            item.url = genImageUrl(item.file);
          }
          return item;
        });
      }
    }
  } else {
    if (typeof imgs === 'string') {
      imgs = [{url: imgs}];
    } else {
      const imgUrl = genImageUrl(imgs);
      if (imgUrl) {
        imgs = [{url: imgUrl}];
      }
    }
  }

  // todo: 永远只返回一个
  // 针对未来可能直接上下个
  return Object.assign([], imgs && (<any[]>imgs).length > 0 ? imgs : []);
}

export function removeByIndex(arr, index) {
  for (let i = 0; i < arr.length; i++) {
    if (i === index) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}

export function getAddress(array) {
  let city = '';
  for (let i = 0; i < array.length; i++) {
    city = city + array[i].name;
  }
  return city;
}

export function leaveDate(leave: string[], business?: string[]) {
  let _business;
  if (!business) {
    _business = ['08:30:00', '18:30:00'];
  } else {
    _business = business;
  }

  /* 把开始时间转成数组 */
  const _start = leave[0].split(/[- :]/);

  /* 把结束时间转成数组 */
  const _end = leave[1].split(/[- :]/);

  const startDay = _start[0] + '/' + _start[1] + '/' + (parseInt(_start[2], 10) + 1);
  const endDay = _end[0] + '/' + _end[1] + '/' + (parseInt(_end[2], 10) - 1);

  let diffDays = (Date.parse(endDay) - Date.parse(startDay)) / (24 * 60 * 60 * 1000);

  let diffHours = ((Date.parse(leave[0].split(' ')[0] + ' ' + _business[1]) - Date.parse(leave[0].split(' ')[0] + ' ' + leave[0].split(' ')[1])) / (60 * 60 * 1000)) + ((Date.parse(leave[1].split(' ')[0] + ' ' + leave[1].split(' ')[1]) - Date.parse(leave[1].split(' ')[0] + ' ' + _business[0])) / (60 * 60 * 1000));

  if (diffHours >= 20) {
    diffDays = diffDays + 2;
    diffHours = diffHours - 20;
  } else if (diffHours >= 10) {
    diffDays = diffDays + 1;
    diffHours = diffHours - 10;
  }

  return {
    days: diffDays,
    hours: diffHours
  };

}

export function getLastMonthDays(date) {
  let year = date.getFullYear();
  let month = date.getMonth();

  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const DATE = new Date(year, month, 0);
  return {
    now: DATE,
    day: DATE.getDate(),
    month: DATE.getMonth() + 1,
    year: DATE.getFullYear(),
    week: DATE.getDay(),
    count: (new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0)).getDate()
  };
}

export function getNextMonthDays(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const DATE = new Date(year, month, 1);
  return {
    now: DATE,
    day: DATE.getDate(),
    month: DATE.getMonth() + 1,
    year: DATE.getFullYear(),
    week: DATE.getDay(),
    count: (new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0)).getDate()
  };
}

export function getDays(date) {
  let year = date.getFullYear();
  let month = date.getMonth();

  if (month === 0) {
    month = 12;
    year = year - 1;
  }

  const PREV_DATE = new Date(year, month - 1, 1);
  const CURR_DATE = new Date(year, month, 1);
  const NEXT_DATE = new Date(year, month + 1, 1);

  const NOW = new Date();

  const PREV_ITEM = {
    now: PREV_DATE,
    day: PREV_DATE.getDate(),
    month: PREV_DATE.getMonth() + 1,
    year: PREV_DATE.getFullYear(),
    week: PREV_DATE.getDay() === 0 ? 7 : PREV_DATE.getDay(),
    count: (new Date(PREV_DATE.getFullYear(), PREV_DATE.getMonth() + 1, 0)).getDate()
  };
  const CURR_ITEM = {
    now: CURR_DATE,
    day: CURR_DATE.getDate(),
    month: CURR_DATE.getMonth() + 1,
    year: CURR_DATE.getFullYear(),
    week: CURR_DATE.getDay() === 0 ? 7 : CURR_DATE.getDay(),
    count: (new Date(CURR_DATE.getFullYear(), CURR_DATE.getMonth() + 1, 0)).getDate()
  };
  const NEXT_ITEM = {
    now: NEXT_DATE,
    day: NEXT_DATE.getDate(),
    month: NEXT_DATE.getMonth() + 1,
    year: NEXT_DATE.getFullYear(),
    week: NEXT_DATE.getDay() === 0 ? 7 : NEXT_DATE.getDay(),
    count: (new Date(NEXT_DATE.getFullYear(), NEXT_DATE.getMonth() + 1, 0)).getDate()
  };

  return {
    now: {
      now: NOW,
      day: NOW.getDate(),
      month: NOW.getMonth() + 1,
      year: NOW.getFullYear(),
      week: NOW.getDay() === 0 ? 7 : date.getDay(),
      count: (new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0)).getDate()
    },
    prev: (function (dateItem) {
      const items = [];
      for (let i = 1; i <= dateItem.count; i++) {
        const _dateNow = new Date(dateItem.year + '/' + dateItem.month + '/' + i);
        // const currDateItems = [];
        const item = {
          now: new Date(dateItem.year + '/' + dateItem.month + '/' + i),
          day: _dateNow.getDate(),
          month: _dateNow.getMonth() + 1,
          year: _dateNow.getFullYear(),
          week: _dateNow.getDay() === 0 ? 7 : _dateNow.getDay(),
          count: dateItem.count
        };
        items.push(item);
      }
      return items;
    })(PREV_ITEM),
    curr: (function (dateItem) {
      const items = [];
      for (let i = 1; i <= dateItem.count; i++) {
        const _dateNow = new Date(dateItem.year + '/' + dateItem.month + '/' + i);
        const item = {
          now: new Date(dateItem.year + '/' + dateItem.month + '/' + i),
          day: _dateNow.getDate(),
          month: _dateNow.getMonth() + 1,
          year: _dateNow.getFullYear(),
          week: _dateNow.getDay() === 0 ? 7 : _dateNow.getDay(),
          count: dateItem.count
        };
        items.push(item);
      }
      return items;
    })(CURR_ITEM),
    next: (function (dateItem) {
      const items = [];
      for (let i = 1; i <= dateItem.count; i++) {
        const _dateNow = new Date(dateItem.year + '/' + dateItem.month + '/' + i);
        const item = {
          now: new Date(dateItem.year + '/' + dateItem.month + '/' + i),
          day: _dateNow.getDate(),
          month: _dateNow.getMonth() + 1,
          year: _dateNow.getFullYear(),
          week: _dateNow.getDay() === 0 ? 7 : _dateNow.getDay(),
          count: dateItem.count
        };
        items.push(item);
      }
      return items;
    })(NEXT_ITEM)
  };
}

export function getDateDifference(date1, date2) {
  const time1 = Date.parse(date1) / 1000;
  const time2 = Date.parse(date2) / 1000;
  const time_ = time1 - time2;
  return (time_ / (3600 * 24));
}

export function formatOrder(item) {
  console.log(item);
  const order = {
    id: item.conid,
    no: item.conno,
    protocol: item.protocolcontent,
    amount: item.conamount,
    paid: item.paidamount,
    payState: {
      amount: item.conamount,
      paid: item.paidamount,
      type: 0,
      confirmPay: item.confirmpay,
      currPeriod: (function (lists) {
        if (lists.length === 0) {
          return null;
        }
        for (let i = 0; i < lists.length; i++) {
          const period = lists[i];
          if (period.paidamount !== period.amount) {
            return {
              paid: period.paidamount,
              amount: period.amount,
              index: period.serviceperiod,
              name: period.periodmonth,
              meta: {
                createAt: period.createtime,
                paidAt: period.paidtime,
                expireAt: 1515400329000
              }
            };
          }
        }
        return null;
      })(item.periodList),
      periods: (function (lists) {
        const _list = [];
        if (lists.length === 0) {
          return _list;
        }
        lists.forEach(period => {
          const _period = {
            paid: period.paidamount,
            amount: period.amount,
            index: period.serviceperiod,
            name: period.periodmonth,
            payno: period.payno,
            meta: {
              createAt: period.createtime,
              paidAt: period.paidtime,
              expireAt: 1515400329000
            }
          };
          _list.push(_period);
        });
        return _list;
      })(item.periodList)
    },
    meta: {
      startAt: item.servicestartdate,
      updateAt: item.updatetime,
      endAt: item.serviceenddate
    },
    employees: (function (lists) {
      const _list = [];
      lists.forEach(employee => {
        const _employee = {
          id: employee.housekeeperid,
          no: employee.housekeeperno,
          type: {
            id: employee.typeid,
            name: employee.typename
          },
          name: employee.name,
          age: employee.age,
          sex: employee.sex,
          height: employee.height,
          weight: employee.weight,
          experience: employee.servicetime,
          skill: employee.skillnames ? employee.skillnames.split(',') : '',
          avatar: Config.prefix.wApi + employee.headimageurl,
          price: employee.commissionamount,
          origin: '',
          level: employee.levelname,
          like: false
        };
        console.log(Config.prefix.wApi + employee.headimageurl);
        _list.push(_employee);
      });
      return _list;
    })(item.housekeeperList)
  };

  return order;
}

export function formatAttendance(attendance) {
  const _attendance = {
    on: {
      time: attendance.actualcheckintime ? attendance.actualcheckintime : '',
      state: '',
      location: attendance.startaddress,
      notice: ''
    },
    off: {
      time: attendance.actualcheckouttime ? attendance.actualcheckouttime : '',
      state: '',
      location: attendance.endaddress,
      notice: ''
    }
  };
  return _attendance;
}

export function validScroll(controls: object) {
  const result = {
    valid: true,
    control: ''
  };
  for (const control in controls) {
    if (controls[control].invalid) {
      result['valid'] = false;
      result['control'] = control;
      return result;
    }
  }
  return result;
}

export function getPrevOfArray(array, currIndex) {
  if (currIndex === 0) {
    return '';
  } else {
    return currIndex - 1;
  }
}

export function getNextOfArray(array, currIndex) {
  if (currIndex === array.length - 1) {
    return '';
  } else {
    return currIndex + 1;
  }
}

export function getRate(score) {
  return 5 * score / 100;
}

function getWeekOfYear() {
  const today = new Date();
  let firstDay = new Date(today.getFullYear(), 0, 1);
  const dayOfWeek = firstDay.getDay();
  let spendDay = 1;
  if (dayOfWeek !== 0) {
    spendDay = 7 - dayOfWeek + 1;
  }
  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
  const d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
  const result = Math.ceil(d / 7);
  return result + 1;
}

function getTime(n) {
  const now = new Date();
  let year = now.getFullYear();
  // 因为月份是从0开始的,所以获取这个月的月份数要加1才行
  let month = now.getMonth() + 1;
  let date = now.getDate();
  const day = now.getDay();
  if (day !== 0) {// 判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    n = n + (day - 1);
  } else {
    n = n + day;
  }
  if (day) {// 这个判断是为了解决跨年的问题
    if (month > 1) {
      month = month;
    } else {// 这个判断是为了解决跨年的问题,月份是从0开始的
      year = year - 1;
      month = 12;
    }
  }
  now.setDate(now.getDate() - n);
  year = now.getFullYear();
  month = now.getMonth() + 1;
  date = now.getDate();
  const s = year + '/' + (month < 10 ? ('0' + month) : month) + '/' + (date < 10 ? ('0' + date) : date) + ' 00:00:00';
  return s;
}


export function getThisWeek() {
  return {
    week: getWeekOfYear(),
    first: getTime(0),
    last: getTime(-6)
  };
}

export function getYesterday() {

}
