import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @HostBinding('attr.class') classes = 'ui  inverted '
  constructor() { }

  ngOnInit() {
  }

}
