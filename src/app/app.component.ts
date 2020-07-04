import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'form';
  activeTab = true;
  selectedIndex = 0;

  checkActiveTabe(event) {
    this.activeTab = event
  }

  changeSelectedTab(event) {
    this.selectedIndex = event
  }
}
