import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {ButtonConfig} from './button.config';
import {ButtonComponent} from './button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent],
  providers: [ButtonConfig],
  exports: [ButtonComponent]
})
export class ButtonModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: ButtonModule, providers: [ButtonConfig]};
  }
}
