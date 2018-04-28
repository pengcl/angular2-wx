/*
function getDayDifference(start, end) {
  const _start = Date.parse(start) / 1000;
  const _end = Date.parse(end) / 1000;
  const days = (_end - _start) / (3600 * 24);
  console.log(days);
  return days;
}

function MathDate(start, end) {
  getDayDifference(new Date(start.year + '/' + start.month + '/' + (start.day + 1) + ' ' + '00:00:00'), new Date(end.year + '/' + end.month + '/' + end.day + ' ' + '00:00:00'));
}

function leaveDate(leave, workingTime, rest) {

  var _workingTime = ['09:00:00', '18:00:00'], _rest = [7];
  if (workingTime) {
    _workingTime = workingTime;
  }
  if (rest) {
    _rest = rest;
  }

  var startObj = {
    day: leave[0].getDate(),
    month: leave[0].getMonth() + 1,
    year: leave[0].getFullYear(),
    week: leave[0].getDay(),
    count: (new Date(leave[0].getFullYear(), leave[0].getMonth() + 1, 0)).getDate()
  };
  var endObj = {
    day: leave[1].getDate(),
    month: leave[1].getMonth() + 1,
    year: leave[1].getFullYear(),
    week: leave[1].getDay(),
    count: (new Date(leave[1].getFullYear(), leave[1].getMonth() + 1, 0)).getDate()
  };
  console.log(startObj, endObj);
  MathDate(startObj, endObj);
}

leaveDate([new Date('2018/03/04 09:30'), new Date('2018/04/09 17:00')], ['09:00:00', '18:00:00'], [7]);
*/

var oj = {
  "answerList": [{
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "answerid": "2e2fec7f-6c42-40a6-9b92-d380a4e86707",
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "signupid": "e1503000-2eea-4adb-977f-f272cdbc9b2d",
    "titleid": "98dc9acd-6603-4724-8d0a-6d057adbe8e7",
    "optionids": "9894f851-81e5-4244-bfe9-3b7ac31e0740",
    "custid": "10000100970537",
    "istrue": 1
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "answerid": "5c7fdc47-96c8-4863-9da2-1ca9a1fda5bc",
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "signupid": "e1503000-2eea-4adb-977f-f272cdbc9b2d",
    "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
    "optionids": "ba04a471-7838-4000-b7b4-f61c146adfe4,e37a8ec3-23e1-46b2-9ffe-92e4d49dfe66",
    "custid": "10000100970537",
    "istrue": 1
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "answerid": "78d31d78-9ee2-404c-af62-8001dc550252",
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "signupid": "e1503000-2eea-4adb-977f-f272cdbc9b2d",
    "titleid": "f05c7b2b-506b-41d6-99f1-42503059ac0f",
    "optionids": "6e516da5-daea-41c0-ae6c-36c342745545",
    "custid": "10000100970537",
    "istrue": 2
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "answerid": "89c8dbb2-1f8e-4cf7-96c4-d9ddcbf98b13",
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "signupid": "e1503000-2eea-4adb-977f-f272cdbc9b2d",
    "titleid": "21e4a9e0-dce6-40b4-91c1-d0bf9cd6499a",
    "optionids": "c855d855-28ff-40aa-96d6-422dcb8f3046",
    "custid": "10000100970537",
    "istrue": 1
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "answerid": "95430dc7-1822-442b-a5c8-510849873935",
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "signupid": "e1503000-2eea-4adb-977f-f272cdbc9b2d",
    "titleid": "0198b381-6bb8-40b5-89e1-38e2ba7773c7",
    "optionids": "1f2a258a-e49f-4806-9f05-fb63598300db",
    "custid": "10000100970537",
    "istrue": 2
  }],
  "exam": {
    "createBy": null,
    "createtime": "2018-04-27 14:51:15",
    "updatetime": "2018-04-27 18:42:17",
    "updateBy": null,
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "examname": "王者荣耀大乱测",
    "examimage": "/exam//image//1804271451153822.jpg",
    "examperiods": "1",
    "credits": 100,
    "titlenum": 5,
    "testtime": 10,
    "begintime": "2018-04-27 00:00:00",
    "endtime": "2018-04-27 19:30:36",
    "regbegintime": "2018-04-27 00:00:00",
    "regendtime": "2018-04-27 19:00:15",
    "createby": null,
    "updateby": null,
    "sernos": null,
    "titleids": null,
    "categoryid": 10000099120404,
    "categoryname": "平时表现",
    "ispublish": 0,
    "desc": "王者荣耀无奖问答比赛",
    "levelid": "",
    "levelname": "",
    "isallowtrainee": 1,
    "opentime": "2018-04-27 00:00:00"
  },
  "code": 0,
  "singlList": [{
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "titleid": "98dc9acd-6603-4724-8d0a-6d057adbe8e7",
    "titleno": 9,
    "title": "王者荣耀的游戏角色设定主要是来自？",
    "subtitle": "",
    "issingle": 1,
    "credits": 1,
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "optionList": [{
      "createBy": null,
      "createtime": "2018-04-27 14:28:52",
      "updatetime": null,
      "updateBy": null,
      "optionid": "0ecfabd6-6547-479c-b1e1-912ba089c85b",
      "titleid": "98dc9acd-6603-4724-8d0a-6d057adbe8e7",
      "serno": "A",
      "optionname": "随便凭空制作",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:29:23",
      "updatetime": null,
      "updateBy": null,
      "optionid": "ff04f281-b299-4b7e-b5d8-5a08ededb05b",
      "titleid": "98dc9acd-6603-4724-8d0a-6d057adbe8e7",
      "serno": "B",
      "optionname": "借鉴神话/古代名人",
      "createby": null,
      "updateby": null,
      "isanswers": 1,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:29:49",
      "updatetime": null,
      "updateBy": null,
      "optionid": "9894f851-81e5-4244-bfe9-3b7ac31e0740",
      "titleid": "98dc9acd-6603-4724-8d0a-6d057adbe8e7",
      "serno": "C",
      "optionname": "以腾讯公司高层人员改编",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:30:02",
      "updatetime": null,
      "updateBy": null,
      "optionid": "0c3c4e0a-e7d7-4400-9b39-f1dc16fcebc9",
      "titleid": "98dc9acd-6603-4724-8d0a-6d057adbe8e7",
      "serno": "D",
      "optionname": "抄袭英雄联盟",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }],
    "serno": 5,
    "isdelete": 1
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "titleid": "f05c7b2b-506b-41d6-99f1-42503059ac0f",
    "titleno": 11,
    "title": "王者荣耀里的英雄收录了以下哪位著名诗人？",
    "subtitle": "",
    "issingle": 1,
    "credits": 1,
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "optionList": [{
      "createBy": null,
      "createtime": "2018-04-27 14:30:41",
      "updatetime": null,
      "updateBy": null,
      "optionid": "6e516da5-daea-41c0-ae6c-36c342745545",
      "titleid": "f05c7b2b-506b-41d6-99f1-42503059ac0f",
      "serno": "A",
      "optionname": "李白",
      "createby": null,
      "updateby": null,
      "isanswers": 1,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:31:04",
      "updatetime": null,
      "updateBy": null,
      "optionid": "d7e439a2-c13e-4ee4-ad7f-91befd80978a",
      "titleid": "f05c7b2b-506b-41d6-99f1-42503059ac0f",
      "serno": "B",
      "optionname": "杜甫",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:31:16",
      "updatetime": null,
      "updateBy": null,
      "optionid": "3752598d-da02-4091-9caf-70c6b70851b6",
      "titleid": "f05c7b2b-506b-41d6-99f1-42503059ac0f",
      "serno": "C",
      "optionname": "白居易",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:31:25",
      "updatetime": null,
      "updateBy": null,
      "optionid": "9b2b7663-7223-4b07-ba1d-05003bb7b832",
      "titleid": "f05c7b2b-506b-41d6-99f1-42503059ac0f",
      "serno": "D",
      "optionname": "屈原",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }],
    "serno": 4,
    "isdelete": 1
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "titleid": "21e4a9e0-dce6-40b4-91c1-d0bf9cd6499a",
    "titleno": 12,
    "title": "诸葛亮有一款英雄皮肤叫“黄金分割率”，那到底数学上黄金分割率是多少呢？（取近似值）",
    "subtitle": "<p><img src=\"/upload/product/20180427/geC7etvY3vvYRdCgvtud35Bdu3t.jpg\" title=\"1524810451620047475.jpg\" alt=\"a.jpg\"/></p>",
    "issingle": 1,
    "credits": 1,
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "optionList": [{
      "createBy": null,
      "createtime": "2018-04-27 14:32:10",
      "updatetime": null,
      "updateBy": null,
      "optionid": "c855d855-28ff-40aa-96d6-422dcb8f3046",
      "titleid": "21e4a9e0-dce6-40b4-91c1-d0bf9cd6499a",
      "serno": "A",
      "optionname": "3.1415926",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:32:17",
      "updatetime": null,
      "updateBy": null,
      "optionid": "f9cc9dcd-cdc1-4f6d-803a-f4a59625e57f",
      "titleid": "21e4a9e0-dce6-40b4-91c1-d0bf9cd6499a",
      "serno": "B",
      "optionname": "1024",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:32:29",
      "updatetime": null,
      "updateBy": null,
      "optionid": "8c4cd39f-78a7-4da4-8983-119053bee8be",
      "titleid": "21e4a9e0-dce6-40b4-91c1-d0bf9cd6499a",
      "serno": "C",
      "optionname": "0.618",
      "createby": null,
      "updateby": null,
      "isanswers": 1,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:33:16",
      "updatetime": null,
      "updateBy": null,
      "optionid": "b748541d-9011-479c-ba40-79174148f67a",
      "titleid": "21e4a9e0-dce6-40b4-91c1-d0bf9cd6499a",
      "serno": "D",
      "optionname": "1314",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }],
    "serno": 3,
    "isdelete": 1
  }, {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "titleid": "0198b381-6bb8-40b5-89e1-38e2ba7773c7",
    "titleno": 14,
    "title": "图中这只动物的名字是？",
    "subtitle": "<p><img src=\"/upload/product/20180427/j2xiw4dUwcdifISRd37xSxdIxIf.gif\" title=\"1524811135122006736.gif\" alt=\"c.gif\"/></p>",
    "issingle": 1,
    "credits": 1,
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "optionList": [{
      "createBy": null,
      "createtime": "2018-04-27 14:39:45",
      "updatetime": null,
      "updateBy": null,
      "optionid": "39f075ed-9ecb-45a9-8342-e5b641974642",
      "titleid": "0198b381-6bb8-40b5-89e1-38e2ba7773c7",
      "serno": "A",
      "optionname": "萌奇",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:39:55",
      "updatetime": null,
      "updateBy": null,
      "optionid": "1f2a258a-e49f-4806-9f05-fb63598300db",
      "titleid": "0198b381-6bb8-40b5-89e1-38e2ba7773c7",
      "serno": "B",
      "optionname": "梦奇",
      "createby": null,
      "updateby": null,
      "isanswers": 1,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:40:16",
      "updatetime": null,
      "updateBy": null,
      "optionid": "f0b4e19c-048f-4b12-b951-0fd22085a7fb",
      "titleid": "0198b381-6bb8-40b5-89e1-38e2ba7773c7",
      "serno": "C",
      "optionname": "梦琪",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:40:23",
      "updatetime": "2018-04-27 14:40:35",
      "updateBy": null,
      "optionid": "3083c88f-bc27-4bc9-90cb-3be6b9ee5ba8",
      "titleid": "0198b381-6bb8-40b5-89e1-38e2ba7773c7",
      "serno": "D",
      "optionname": "萌琪",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }],
    "serno": 1,
    "isdelete": 1
  }],
  "multiList": [{
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
    "titleno": 13,
    "title": "以下图中是哪几个英雄？",
    "subtitle": "<p><img src=\"/upload/product/20180427/jwSiw3cU2cdUf3SRd3ixw4j4EvS.jpg\" title=\"1524810473876046648.jpg\" alt=\"b.jpg\"/></p>",
    "issingle": 0,
    "credits": 1,
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "optionList": [{
      "createBy": null,
      "createtime": "2018-04-27 14:33:37",
      "updatetime": null,
      "updateBy": null,
      "optionid": "45712928-1ec3-412a-bfb5-35e7132e4251",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "A",
      "optionname": "干将",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:33:46",
      "updatetime": null,
      "updateBy": null,
      "optionid": "350c682b-c2d6-4e25-a441-68cdbe5a596f",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "B",
      "optionname": "莫邪",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:33:56",
      "updatetime": null,
      "updateBy": null,
      "optionid": "5ddf39d7-e2ce-4797-a3e8-7fd13381f1e4",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "C",
      "optionname": "周瑜",
      "createby": null,
      "updateby": null,
      "isanswers": 1,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:34:04",
      "updatetime": null,
      "updateBy": null,
      "optionid": "ba04a471-7838-4000-b7b4-f61c146adfe4",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "D",
      "optionname": "小乔",
      "createby": null,
      "updateby": null,
      "isanswers": 1,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:34:16",
      "updatetime": null,
      "updateBy": null,
      "optionid": "c2539b1c-d564-490f-bee1-e73c337ace91",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "E",
      "optionname": "诸葛亮",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:34:26",
      "updatetime": null,
      "updateBy": null,
      "optionid": "e37a8ec3-23e1-46b2-9ffe-92e4d49dfe66",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "F",
      "optionname": "黄月英",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:34:38",
      "updatetime": null,
      "updateBy": null,
      "optionid": "5f94b519-23d0-4c77-a588-60899b24d30b",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "G",
      "optionname": "刘备",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }, {
      "createBy": null,
      "createtime": "2018-04-27 14:34:48",
      "updatetime": null,
      "updateBy": null,
      "optionid": "43007c2a-f408-4689-b383-256198a276fd",
      "titleid": "ca081bca-132c-4c1a-9ea4-2be9e75443e2",
      "serno": "H",
      "optionname": "孙尚香",
      "createby": null,
      "updateby": null,
      "isanswers": 0,
      "examid": ""
    }],
    "serno": 2,
    "isdelete": 1
  }],
  "signUp": {
    "createBy": null,
    "createtime": null,
    "updatetime": null,
    "updateBy": null,
    "signupid": "e1503000-2eea-4adb-977f-f272cdbc9b2d",
    "examid": "07c51a52-01a9-4ea2-9eef-a547a161254e",
    "custid": "10000100970537",
    "signuptime": "2018-04-27 18:48:50",
    "begintime": "2018-04-27 18:42:36",
    "endtime": "2018-04-27 18:48:50",
    "examresults": 2,
    "isopen": 1,
    "submitstatus": 1,
    "examname": "王者荣耀大乱测",
    "examperiods": "1",
    "categoryname": "平时表现",
    "exambegintime": "2018-04-27 00:00:00",
    "examendtime": "2018-04-27 19:30:36",
    "cust_name": null,
    "examimage": "/exam//image//1804271451153822.jpg",
    "credits": 100,
    "titlenum": 5,
    "testtime": 10,
    "regbegintime": "2018-04-27 00:00:00",
    "regendtime": "2018-04-27 19:00:15",
    "ispublish": 0,
    "desc": "王者荣耀无奖问答比赛",
    "levelid": "",
    "levelname": "",
    "isallowtrainee": 1,
    "opentime": "2018-04-27 00:00:00"
  }
}

