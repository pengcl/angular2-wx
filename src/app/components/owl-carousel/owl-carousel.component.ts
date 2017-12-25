import {Component, ViewChild, Input, IterableDiffers, IterableDiffer, DoCheck} from '@angular/core';
import {OwlCarouselItemComponent} from './owl-carousel-item.component';

@Component({
  selector: 'app-owl-carousel',
  template:
  '<owl-carousel-child #owl [ngClass]="carouselClasses" [options]="options">' +
  '<ng-content></ng-content></owl-carousel-child>',
})

export class OwlCarouselComponent implements DoCheck {
  @ViewChild('owl') $owlChild: OwlCarouselItemComponent;
  @Input() carouselClasses: any = '';
  @Input() options: any = {};
  private _items: any;
  private differ: IterableDiffer<any>;

  constructor(private differs: IterableDiffers) {
  }

  @Input() set items(coll: any[]) {
    this._items = coll;
    if (coll && !this.differ) {
      this.differ = this.differs.find(coll).create(null);
    }
  }

  ngDoCheck() {
    if (this.differ) {
      const changes = this.differ.diff(this._items);
      if (changes) {
        let changed = false;
        const changedFn = () => {
          changed = true;
        };
        changes.forEachAddedItem(changedFn);
        changes.forEachMovedItem(changedFn);
        changes.forEachRemovedItem(changedFn);
        if (changed) {
          this.reInit();
        }
      }
    }
  }

  reInit() {
    setTimeout(() => {
      if (this.$owlChild) {
        this.$owlChild.destroyOwl();
        this.$owlChild.initOwl();
      }
    }, 0);
  }

  refresh() {
    this.trigger('refresh.owl.carousel');
  }

  next(options?: any[]) {
    this.trigger('next.owl.carousel', options);
  }

  previous(options?: any[]) {
    this.trigger('prev.owl.carousel', options);
  }

  to(options?: any[]) {
    this.trigger('to.owl.carousel', options);
  }

  trigger(action: string, options?: any[]) {
    this.$owlChild.trigger(action, options);
  }
}
