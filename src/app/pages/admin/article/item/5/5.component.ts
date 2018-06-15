import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-admin-article-item-5',
  templateUrl: './5.component.html',
  styleUrls: ['./5.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminArticleItem5Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  @ViewChild('scrollable') private container: any;

  // pdf
  canvas: any;
  ctx;
  pdfDoc = null;
  pageRendering;
  pageNumPending = null;
  pageNum: number = 1;

  constructor() {
  }

  ngOnInit() {
    this.pageNum = 1;
    const url = '/assets/pdf/5.pdf';

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.bootcss.com/pdf.js/2.0.466/pdf.worker.min.js';

    // Asynchronous download of PDF
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf) => {
      this.pdfDoc = pdf;
      // Fetch the first page
      this.canvas = document.getElementById('the-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.renderPage(this.pageNum);
    });
  }

  renderPage(num) {
    this.pageRendering = true;
    // Using promise to fetch the page
    this.pdfDoc.getPage(num).then((page) => {
      if (!page) {
        return false;
      }
      const viewport = page.getViewport(this.container.nativeElement.clientWidth / page.view[2]);
      this.canvas.height = this.container.nativeElement.clientHeight - 50;
      this.canvas.width = this.container.nativeElement.clientWidth;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: this.ctx,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(() => {
        this.pageRendering = false;
        if (this.pageNumPending !== null) {
          // New page rendering is pending
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
      });
    });

    // Update page counters
  }

  queueRenderPage(num) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  onPrevPage() {
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }

  onNextPage() {
    if (this.pageNum >= this.pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }
}
