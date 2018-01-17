import {FileLikeObject} from './file-like-object.class';
import {Uploader, ParsedResponseHeaders} from './uploader.class';
import {UploaderOptions} from './uploader.options';

declare const window: any;

/**
 * 文件对象
 */
export class FileItem {

  /**
   * 文件ID，每个对象具有唯一ID，与文件名无关
   *
   * @type {string}
   */
  id: string;

  /**
   * 重建文件结构对象
   *
   * @type {FileLikeObject}
   */
  file: FileLikeObject;

  /**
   * 原生对象
   *
   * @type {File}
   */
  _file: File;

  /**
   * 索引
   */
  index: number = 0;

  /**
   * 上传进度
   *
   * @type {number}
   */
  progress: number = 0;

  /**
   * 准备上传就绪
   *
   * @type {boolean}
   */
  isReady: boolean = false;
  /**
   * 上传中
   *
   * @type {boolean}
   */
  isUploading: boolean = false;
  /**
   * 已上传（不管错误与否都是true）
   *
   * @type {boolean}
   */
  isUploaded: boolean = false;
  /**
   * 上传成功
   *
   * @type {boolean}
   */
  isSuccess: boolean = false;
  /**
   * 用户取消上传
   *
   * @type {boolean}
   */
  isCancel: boolean = false;
  /**
   * 上传失败
   *
   * @type {boolean}
   */
  isError: boolean = false;

  /**
   * HTTP请求对象
   *
   * @type {XMLHttpRequest}
   */
  _xhr: XMLHttpRequest;

  /**
   * 上传配置信息
   *
   * @type {UploaderOptions}
   */
  options: UploaderOptions;

  /**
   * @docs-private
   */
  protected uploader: Uploader;

  constructor(uploader: Uploader, file: File, options: UploaderOptions) {
    this.uploader = uploader;
    this.setOptions(options);
    this.id = Math.random().toString(36).substring(7);
    this.file = new FileLikeObject(file);
    this._file = file;
  }

  /**
   * @docs-private
   */
  setOptions(options: UploaderOptions) {
    this.options = Object.assign({}, this.uploader.options, options);
  }

  /**
   * 上传
   */
  upload(): void {
    try {
      this.uploader.uploadItem(this);
    } catch (e) {
      this.uploader._onCompleteItem(this, '', 0, {});
      this.uploader._onErrorItem(this, '', 0, {});
    }
  }

  /**
   * 取消上传
   */
  cancel(): void {
    this.uploader.cancelItem(this);
  }

  /**
   * 从队列中移除，当文件正在上传中时会先取消
   */
  remove(): void {
    this.uploader.removeFromQueue(this);
  }

  _prepareToUploading(): void {
    this.index = this.index || this.uploader._getNextIndex();
    this.isReady = true;
  }

  _onBeforeUpload(): void {
    this.isReady = true;
    this.isUploading = true;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;

    if (this.options.onUploadStart) this.options.onUploadStart(this);
  }

  _onProgress(progress: number): any {
    this.progress = progress;
    if (this.options.onUploadProgress) this.options.onUploadProgress(progress, this.uploader.progress);
  }

  _onSuccess(response: string, status: number, headers: ParsedResponseHeaders) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = true;
    this.isCancel = false;
    this.isError = false;
    this.progress = 100;
    this.index = void 0;

    if (this.options.onUploadSuccess) this.options.onUploadSuccess(this, response, status, headers);
  }

  _onError(response: string, status: number, headers: ParsedResponseHeaders) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = true;
    this.progress = 0;
    this.index = void 0;

    if (this.options.onUploadError) this.options.onUploadError(this, response, status, headers);
  }

  _onComplete(response: string, status: number, headers: ParsedResponseHeaders): void {
    if (this.uploader.options.removeAfterUpload) {
      this.remove();
    }

    if (this.options.onUploadComplete) this.options.onUploadComplete(this, response, status, headers);
  }

  _onCancel(response: string, status: number, headers: ParsedResponseHeaders): any {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = true;
    this.isError = false;
    this.progress = 0;
    this.index = void 0;

    if (this.options.onUploadCancel) this.options.onUploadCancel(this);
  }
}
