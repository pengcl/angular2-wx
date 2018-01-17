import {genImageUrl} from './browser';

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

export function getIndex(jsonArray, keyName, value) {
  for (let i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i][keyName] === value) {
      return i;
    }
  }
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
}
