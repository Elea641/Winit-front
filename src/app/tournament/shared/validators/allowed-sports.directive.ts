import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Subscription, map, of, tap } from 'rxjs';

import { Sport } from 'src/app/sport/models/sport.type';
import { SportService } from 'src/app/sport/shared/sport.service';

export function allowedSports(sportService: SportService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let knownSports: Sport[];

    const subscription: Subscription = sportService
      .getAllSports()
      .pipe(
        tap((sports: Sport[]) => {
          knownSports = sports;
        }),
        map(() => {
          const isValueInKnownSports = knownSports.some(
            sport => sport.name === control.value
          );

          if (!isValueInKnownSports) {
            return of({ notInKnownSports: true });
          }

          return of(null);
        })
      )
      .subscribe({
        next: () => {
          subscription.unsubscribe();
        },
        error: error => {
          if (error.error) {
            subscription.unsubscribe();
          }
        },
      });

    return null;
  };
}
