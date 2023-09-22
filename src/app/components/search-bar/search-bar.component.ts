import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchFilter = new EventEmitter<string>();

  onSearch(value: string) {
    this.searchFilter.emit(value);
  }
}
