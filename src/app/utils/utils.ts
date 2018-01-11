const isCn = function (str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return false;
  }
  return true;
};

export function formDataToUrl(body: object): string {
  let str = '';
  for (const keyName in body) {
    if (!str) {
      str = '?' + keyName + '=' + encodeURI(encodeURI(body[keyName]));
    } else {
      str = str + '&' + keyName + '=' + encodeURI(encodeURI(body[keyName]));
    }
  }
  return str;
}
