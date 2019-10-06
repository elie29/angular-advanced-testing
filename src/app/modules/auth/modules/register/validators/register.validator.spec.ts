import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { RegisterValidator } from './register.validator';

describe('RegisterValidator unit test', () => {
  it('should test strong password', () => {
    const strongError = RegisterValidator.strongPassword(
      new FormControl('125480')
    );
    expect(strongError.strongPassword.variationCount).toBe(1);

    const strong = RegisterValidator.strongPassword(new FormControl('M1.'));
    expect(strong).toBeNull();
  });

  it('should test allowed email', fakeAsync(() => {
    let data: any;

    const allowed$ = RegisterValidator.forbiddenEmail(
      new FormControl('elie@elie.com')
    );

    allowed$.subscribe(next => (data = next));

    tick(550);

    expect(data).toBeNull();
  }));

  it('should test forbidden email', fakeAsync(() => {
    let data: any;

    const forbidden$ = RegisterValidator.forbiddenEmail(
      new FormControl('test@test.com')
    );

    forbidden$.subscribe(next => (data = next));

    tick(550);

    expect(data.forbiddenEmail).toBeTruthy();
  }));

  it('should test required first and last name', () => {
    const req = RegisterValidator.requiredName(
      new FormGroup({
        firstName: new FormControl('Elie'),
        lastName: new FormControl('NEHME')
      })
    );

    expect(req).toBeNull();
  });

  it('should test required empty firstname', () => {
    const req = RegisterValidator.requiredName(
      new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl('NEHME')
      })
    );

    expect(req.emptyName).toBeTruthy();
  });
});
