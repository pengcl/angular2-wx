import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @Input() slides;
  show = false;
  type = 'component';

  @ViewChild(SwiperDirective) directiveRef: SwiperDirective; // ngAfterViewInit
  @ViewChild(SwiperComponent) componentRef: SwiperComponent; // ngAfterViewInit

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.onIndexChange(0);
  }

  ngAfterViewInit() {
    this.componentRef.directiveRef.startAutoplay();
  }

  onShow() {
    this.show = true;
  }

  onIndexChange(index: number) {
    this.titleService.setTitle(String(index + 1) + '/' + String(this.slides.length));
  }

}
