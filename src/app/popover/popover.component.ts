import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out'))
    ])
  ]
})
export class PopoverComponent {
    @Input() message: string = ''
    @Input() state = 'out';
    @Input() x: number = 0;
    @Input() y: number = 0;

    constructor() { }
}
