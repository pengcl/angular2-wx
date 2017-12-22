import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {StorageService} from './services/storage.service';
import {WxService} from './services/wx.service';
import {UserService} from './services/user.service';

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
    AppRoutingModule,
    HttpModule
  ],
  providers: [StorageService, WxService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
