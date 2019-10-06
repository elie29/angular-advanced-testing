import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDynamicLabel]'
})
export class DynamicLabelDirective {
  @HostBinding('class.hide-label') ishidden = true;

  @HostListener('mouseenter')
  show() {
    this.ishidden = false;
  }

  @HostListener('mouseleave')
  hide() {
    this.ishidden = true;
  }
}
