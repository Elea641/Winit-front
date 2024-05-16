import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isOpen$ = this.isOpenSubject.asObservable();
}
