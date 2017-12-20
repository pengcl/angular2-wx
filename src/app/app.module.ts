import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {WxService} from './services/wx.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IndexComponent} from './pages/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [WxService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
