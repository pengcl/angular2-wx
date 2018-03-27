// modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ModuleWithProviders, ErrorHandler} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ChartF2Module} from './modules/chart-f2';
import {
  CellModule,
  DialogModule,
  InfiniteLoaderModule,
  PickerModule,
  ActionSheetModule,
  ButtonModule,
  RatingModule,
  UploaderModule,
  TabModule,
  ToastModule
} from 'ngx-weui';
import {WxModule} from './modules/wx';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

// pipes
import {EmployeesPipe} from './pipes/employees.pipe';
import {RenamePipe} from './pipes/rename.pipe';
import {WeekPipe, CallbackPipe, RepairSrcPipe} from './pipes/pipes.pipe';

// services
import {SERVICES_DECLARATIONS} from './services';

// components
import {AppComponent} from './app.component';
import {AppPayComponent} from './pages/pay/pay.component';
import {COMPONENTS_DECLARATIONS} from './components';
import {FRONT_PAGES_DECLARATIONS} from './pages/front';
import {ADMIN_PAGES_DECLARATIONS} from './pages/admin';
import {RECRUITMENT_PAGES_DECLARATIONS} from './pages/recruitment';
import {WX_PAGES_DECLARATIONS} from './pages/wx';

// directives
import {DIRECTIVES_DECLARATIONS} from './directives';

import {SwiperModule, SWIPER_CONFIG, SwiperConfigInterface} from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  keyboard: true,
  observer: true,
  mousewheel: true,
  scrollbar: false,
  navigation: true,
  pagination: true
};

@NgModule({
  declarations: [
    EmployeesPipe,
    RenamePipe,
    WeekPipe,
    RepairSrcPipe,
    CallbackPipe,
    AppComponent,
    AppPayComponent,
    ...COMPONENTS_DECLARATIONS,
    ...FRONT_PAGES_DECLARATIONS,
    ...ADMIN_PAGES_DECLARATIONS,
    ...RECRUITMENT_PAGES_DECLARATIONS,
    ...WX_PAGES_DECLARATIONS,
    ...DIRECTIVES_DECLARATIONS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CellModule.forRoot(),
    SwiperModule,
    ActionSheetModule.forRoot(),
    PickerModule.forRoot(),
    ChartF2Module,
    RatingModule.forRoot(),
    WxModule,
    InfiniteLoaderModule.forRoot(),
    DialogModule.forRoot(),
    ButtonModule.forRoot(),
    UploaderModule.forRoot(),
    TabModule.forRoot(),
    ToastModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
    ...SERVICES_DECLARATIONS,
    EmployeesPipe,
    WeekPipe,
    CallbackPipe,
    RepairSrcPipe,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {provide: ErrorHandler, useClass: AppComponent}
  ],
  bootstrap: [AppComponent],
  entryComponents: [...COMPONENTS_DECLARATIONS]
})
export class AppModule {
}
