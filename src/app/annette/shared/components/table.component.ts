/***************************************************************************************
 * Copyright (c) 2014-2017 by Valery Lobachev
 * Redistribution and use in source and binary forms, with or without
 * modification, are NOT permitted without written permission from Valery Lobachev.
 *
 * Copyright (c) 2014-2017 Валерий Лобачев
 * Распространение и/или использование в исходном или бинарном формате, с изменениями или без таковых,
 * запрещено без письменного разрешения правообладателя.
 ****************************************************************************************/

/**
 * Created by valery on 25.05.16.
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * celled
 * striped
 * unstackable
 * selectable
 * collapsing
 * inverted
 * sortable
 * padded
 * compact
 *
 * color
 * size
 */

@Component({
  selector: 'sem-table',
  templateUrl: 'table.component.ts',
})
export class SemTableComponent {
  @Input('options')
  public options: TableOptions = {};

  @Input('columns')
  public columns: TableColumn[] = []

  @Input('data')
  set data(val: any[]) {
    this._data = val
    this.sortData()
  }
  get data(): any[] {
    return this._data
  }

  @Input('selectedItem')
  selectedItem: any

  public _data: any[] = []

  public dataToDisplay: any[] = []

  public orderField = ''
  public ascending = true

  @Output('select')
  public selectEvent: EventEmitter<any> = new EventEmitter();

  onSelect(item: any) {
    if (this.options.selectable) {
      this.selectEvent.emit(item)
    }
  }

  toggleSort = (event, column: TableColumn) => {
    event.preventDefault();
    if (this.orderField === column.field) {
      if (this.ascending ) {
        this.ascending = false
      } else {
        this.orderField = '';
        this.ascending = true
      }
    } else {
      this.orderField = column.field;
      this.ascending = true
    }

    this.sortData()
  }

  sortData() {
    if (this.orderField === '') {
      this.dataToDisplay = this._data
    } else {
      this.sort(this.orderField, this.ascending)
    }
    // console.log(this.orderField)
    // console.log(this.ascending)
    // console.log('sortData:')
    // console.log(this.dataToDisplay)
  }
  sort(field: string, ascending: boolean) {
    function ascendingSort(a: any, b: any):number {
      if (a[field] > b[field]) return 1;
      if (a[field] < b[field]) return -1;
      return 0;
    }
    function descendingSort(a: any, b: any):number {
      if (a[field] < b[field]) return 1;
      if (a[field] > b[field]) return -1;
      return 0;
    }

    if (ascending) {
      this.dataToDisplay = this._data.filter((a) => true)
      this.dataToDisplay.sort(ascendingSort)
    } else {
      this.dataToDisplay = this._data.filter((a) => true)
      this.dataToDisplay.sort(descendingSort)
    }
  }

}


export interface TableOptions{
  celled?: boolean,
  striped?: boolean,
  unstackable?: boolean,
  selectable?: boolean,
  collapsing?: boolean,
  inverted?: boolean,
  sortable?: boolean,
  padded?: boolean,
  compact?: boolean,

  color?: string,
  size?: string
}

export interface TableColumn {
  caption: string,
  field: string,
  width?: string
  bool?: boolean
}
