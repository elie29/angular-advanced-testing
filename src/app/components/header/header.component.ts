import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@services/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  title = 'Angular Advanced Features';
  @Input() user: User;

  @Output() logout = new EventEmitter<boolean>();

  onLogout(): void {
    this.logout.emit(true);
  }
}
