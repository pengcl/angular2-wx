import {Routes} from '@angular/router';
import {GuidePosterComponent} from './poster/poster.component';
import {GuideKnowledgeComponent} from './knowledge/knowledge.component';
import {GuideStartComponent} from './start/start.component';
import {GuideStep1Component} from './step-1/step-1.component';
import {GuideStep2Component} from './step-2/step-2.component';
import {GuideStep3Component} from './step-3/step-3.component';
import {GuideStep4Component} from './step-4/step-4.component';
import {GuideStep5Component} from './step-5/step-5.component';
import {GuideStep6Component} from './step-6/step-6.component';
import {GuideStep7Component} from './step-7/step-7.component';
import {GuideStep8Component} from './step-8/step-8.component';
import {GuideNStep4Component} from './nstep-4/step-4.component';
import {GuideNStep5Component} from './nstep-5/step-5.component';
import {GuideNStep6Component} from './nstep-6/step-6.component';
import {GuideNStep7Component} from './nstep-7/step-7.component';
import {GuideNStep8Component} from './nstep-8/step-8.component';

export const appGuideRoutes: Routes = [
  {path: 'poster', component: GuidePosterComponent},
  {path: 'knowledge', component: GuideKnowledgeComponent},
  {path: 'start', component: GuideStartComponent},
  {path: 'step1', component: GuideStep1Component},
  {path: 'step2', component: GuideStep2Component},
  {path: 'step3', component: GuideStep3Component},
  {path: 'step4', component: GuideStep4Component},
  {path: 'step5/:id', component: GuideStep5Component},
  {path: 'step6/:id', component: GuideStep6Component},
  {path: 'step7', component: GuideStep7Component},
  {path: 'step8', component: GuideStep8Component},

  {path: 'n4', component: GuideNStep4Component},
  {path: 'n5/:id', component: GuideNStep5Component},
  {path: 'n6/:id', component: GuideNStep6Component},
  {path: 'n7', component: GuideNStep7Component},
  {path: 'n8', component: GuideNStep8Component},
  {
    path: '**', redirectTo: 'index'
  }
];
