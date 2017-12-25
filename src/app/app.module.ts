import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {StorageService} from './services/storage.service';
import {WxService} from './services/wx.service';
import {UserService} from './services/user.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {COMPONENTS_DECLARATIONS} from './components';
import {FRONT_PAGES_DECLARATIONS} from './pages/front';
import {ADMIN_PAGES_DECLARATIONS} from './pages/admin';
import { GalleryComponent } from './components/gallery/gallery.component';
import { OwlCarouselComponent } from './components/owl-carousel/owl-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS_DECLARATIONS,
    ...FRONT_PAGES_DECLARATIONS,
    ...ADMIN_PAGES_DECLARATIONS
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
