import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './rating.component';
import {RatingConfig} from './rating.config';

@NgModule({
  imports: [CommonModule],
  declarations: [RatingComponent],
  exports: [RatingComponent],
  entryComponents: [RatingComponent],
  providers: [RatingConfig]
})
export class RatingModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: RatingModule, providers: []};
  }
}
