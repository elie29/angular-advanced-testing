import { User } from '@services/user.model';

export interface State {
  user: User;
  [name: string]: any; // for selection purpose
}

export const DEFAULT_STATE: State = {
  user: null,
};
