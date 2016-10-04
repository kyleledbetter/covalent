import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CovalentCoreModule } from '../core';

import { TdDataTableComponent } from './data-table.component';
import { TdDataTableContainerComponent } from './components/container.component';

import { TdDataTableTableDirective } from './directives/table.directive';
import { TdDataTableHeadDirective } from './directives/head.directive';
import { TdDataTableBodyDirective } from './directives/body.directive';
import { TdDataTableRowDirective } from './directives/row.directive';
import { TdDataTableColumnDirective } from './directives/column.directive';
import { TdDataTableCellDirective } from './directives/cell.directive';

import { TdDataTableSearchPipe } from './pipes/search.pipe';

export const TD_DATA_TABLE_DIRECTIVES: Type<any>[] = [
  TdDataTableComponent,
  TdDataTableContainerComponent,

  TdDataTableTableDirective,
  TdDataTableHeadDirective,
  TdDataTableBodyDirective,
  TdDataTableRowDirective,
  TdDataTableColumnDirective,
  TdDataTableCellDirective,
];

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TD_DATA_TABLE_DIRECTIVES,
    TdDataTableSearchPipe,
  ],
  exports: [
    TD_DATA_TABLE_DIRECTIVES,
  ],
})
export class CovalentDataTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CovalentDataTableModule,
      providers: [],
    };
  }
}