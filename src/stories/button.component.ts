import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { DestroyObservables } from '../app/destroy-observables';

@Component({
  selector: 'storybook-button',
  template: `
    <button
      type="button"
      (click)="onClick.emit($event)"
      [ngClass]="classes"
      [ngStyle]="{ 'background-color': backgroundColor }"
    >
      {{ label }}
    </button>`,
  styleUrls: ['./button.css'],
})
export default class ButtonComponent extends DestroyObservables implements OnInit {
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /**
   * Optional click handler
   */
  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }

  ngOnInit() {
    new Observable().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
