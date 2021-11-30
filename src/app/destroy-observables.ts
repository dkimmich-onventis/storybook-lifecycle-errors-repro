import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyObservables implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
