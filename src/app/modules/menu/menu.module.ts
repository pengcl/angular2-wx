import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {MenuService} from './menu.service';
import {WeUiModule} from 'ngx-weui';

@NgModule({
  imports: [CommonModule, RouterModule, WeUiModule],
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
