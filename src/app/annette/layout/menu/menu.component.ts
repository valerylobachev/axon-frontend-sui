import {Component, HostBinding, Input} from '@angular/core';
import {Menu} from './menu.model'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']

})
export class MenuComponent {

  @HostBinding('attr.class') classes = 'ui  vertical menu'

  @Input()
  menuItems: Menu[]

  constructor() {}


}
