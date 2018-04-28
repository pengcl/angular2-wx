import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {MenuService} from './menu.service';

@NgModule({
  imports: [CommonModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
  entryComponents: [MenuComponent],
  providers: [MenuService]
})
export class MenuModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: MenuModule, providers: []};
  }
}
