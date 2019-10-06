import { User } from '@services/user.model';
import { Store } from '@store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DEFAULT_STATE } from './state';

interface Person {
  name: string;
  age: number;
}

describe('test the store', () => {
  let store: Store;
  let subscription;

  beforeEach(() => {
    store = new Store();
    subscription = new Subscription();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should have default state', () => {
    expect(store.value).toBe(DEFAULT_STATE);
  });

  it('should return empty user from state', () => {
    expect(store.value.user).toBeNull();
  });

  it('should return empty user', () => {
    expect(store.get('user')).toBeNull();
  });

  it('should reset the store', () => {
    store.set<number>('age', 15);
    store.reset();

    expect(store.value).toEqual(DEFAULT_STATE);
    expect(store.get<number>('age')).toBeUndefined();
  });

  it('should change state reference', () => {
    const john = { name: 'John', age: 25 };

    store.set<Person>('person', john);
    const state1 = store.value;

    store.set<Person>('person', john);
    const state2 = store.value;

    expect(store.get<Person>('person')).toBe(john);

    expect(state1).toEqual(state2); // same state content
    expect(state1).not.toBe(state2); // different state reference
  });

  it('should dispatch on subscription', () => {
    let user = void 0;
    let count = 0;

    subscription.add(
      store
        .select<User>('user')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (user = next))
    );

    // always one as it is a BehaviorSubject
    expect(count).toBe(1);
    expect(user).toBeNull();
  });

  it('should not dispatch for user when we set other values', () => {
    let user = void 0;
    let count = 0;

    subscription.add(
      store
        .select<User>('user')
        // count dispatch events
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (user = next))
    );

    // set values in store different than user
    for (let i = 0; i < 10; i += 1) {
      store.set<number>('age', i);
    }

    // always one as it is a BehaviorSubject (even with many set calls)
    expect(count).toBe(1);
    expect(user).toBeNull();
  });

  it('should not dispatch when we set same primitive values', () => {
    let count = 0;
    let age = 0;

    subscription.add(
      store
        .select<number>('age')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (age = next))
    );

    // set same values in the store
    for (let i = 0; i < 10; i += 1) {
      store.set<number>('age', 15);
    }

    expect(count).toBe(2); // one on subscribe + one on the first set
    expect(age).toBe(15);
  });

  it('should not dispatch when we set same object reference', () => {
    let count = 0;
    let person: Person;

    subscription.add(
      store
        .select<Person>('person')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (person = next))
    );

    // set same reference value in the store
    const john = { name: 'John', age: 25 };
    for (let i = 0; i < 10; i += 1) {
      store.set<Person>('person', john);
    }

    expect(count).toBe(2); // one on subscribe + one with the first set
    expect(person).toBe(john);
  });

  it('should dispatch when we set same object content but with different reference', () => {
    let count = 0;
    let person: Person;

    subscription.add(
      store
        .select<Person>('person')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (person = next))
    );

    // set same reference value in the store
    for (let i = 0; i < 10; i += 1) {
      store.set<Person>('person', { name: 'John', age: 25 });
    }

    expect(count).toBe(11); // one on subscribe + one on set calls
    expect(person).toEqual({ name: 'John', age: 25 }); // same content but not same reference
  });

  it('is important to be careful with state', () => {
    store.set<User>('user', {
      timestamp: Date.now(),
      email: 'test@test.com',
      authenticated: true,
    });

    const value = store.value;
    value.user.timestamp = Date.now();

    // value and state has same content and reference
    expect(value).toEqual(store.value);
    expect(value).toBe(store.value);
  });

  it('is important to change state immutably', () => {
    store.set<User>('user', {
      timestamp: Date.now(),
      email: 'test@test.com',
      authenticated: true,
    });

    const value = { ...store.value }; // make a new reference of the whole state
    value.user = { ...value.user, authenticated: false }; // deep copy is important for the value we need to change.

    // value and state has different content and reference
    expect(value).not.toEqual(store.value);
    expect(value).not.toBe(store.value);
  });

  it('is important to be careful with a state value', () => {
    store.set<Person>('person', { name: 'John', age: 25 });

    const value = store.get<Person>('person');
    value.age = 29; // dangerous !!

    // value and state has same content and reference
    expect(value).toEqual(store.get<Person>('person'));
    expect(value).toBe(store.get<Person>('person'));
  });

  it('is important to change state value immutably', () => {
    store.set<Person>('person', { name: 'John', age: 25 });

    const value = { ...store.get<Person>('person'), age: 28 };

    // value and state has different content and reference
    expect(value).not.toEqual(store.get<Person>('person'));
    expect(value).not.toBe(store.get<Person>('person'));
  });
});
