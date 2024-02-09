import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appSortOrder]',
  standalone: true
})
export class SortOrderDirective {
  @Input() appSortOrder: string = "";
  @Output() sortEvent: EventEmitter<string> = new EventEmitter<string>();

  private sortOrder = 1; // 1 for ascending, -1 for descending

  @HostListener('click') onClick() {
    this.sortOrder = this.sortOrder * -1; // Toggle between ascending and descending
    this.sortEvent.emit(`${this.appSortOrder}:${this.sortOrder}`);
  }
}
