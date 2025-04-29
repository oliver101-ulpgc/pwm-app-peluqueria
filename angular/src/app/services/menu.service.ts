import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isMenuOpen = new BehaviorSubject<boolean>(false);
  public isMenuOpen$ = this.isMenuOpen.asObservable();

  toggleMenu() {
    this.isMenuOpen.next(!this.isMenuOpen.value);
  }

  closeMenu() {
    this.isMenuOpen.next(false);
  }
}
