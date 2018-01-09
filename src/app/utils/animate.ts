import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

export const slide = trigger('someCoolAnimation', [
  transition('* => slideDown', [
    style({opacity: 0, height: '0px'}),
    animate(1000, style({opacity: 1, height: 'auto'}))
  ]),
  transition('* => slideUp', [
    animate(1000, style({opacity: 0, height: '0px'}))
  ])
]);
