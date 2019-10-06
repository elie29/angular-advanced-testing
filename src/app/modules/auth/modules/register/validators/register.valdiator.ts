import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class RegisterValidator {
  // Synchrone over control
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value.trim();
    const variationCount = RegisterValidator.computeVariations(password);
    return variationCount > 2 ? null : { strongPassword: { variationCount } };
  }

  // Asynchrone over control
  static forbiddenEmail(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(500).pipe(
      take(1), // in order to unsubscribe
      map(_ => {
        if (control.value === 'test@test.com') {
          return { forbiddenEmail: true };
        }
        return null;
      })
    );
  }

  // Synchrone over group
  static requiredName(group: AbstractControl): ValidationErrors | null {
    const fn = group.get('firstName').value.trim();
    const ln = group.get('lastName').value.trim();
    // Both are filled
    if (fn && ln) {
      return null;
    }
    return { emptyName: true };
  }

  private static computeVariations(password: string): number {
    const variations: { [key: string]: boolean } = {
      digits: /\d/.test(password),
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      nonWords: /\W/.test(password)
    };
    let variationCount = 0;
    for (const key of Object.keys(variations)) {
      variationCount += variations[key] === true ? 1 : 0;
    }
    return variationCount;
  }
}
