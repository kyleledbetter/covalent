import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

/**
 * COMPONENTS
 */

// Layouts
import { TdLayoutComponent } from './layout/layout.component';
import { TdLayoutNavComponent } from './layout/layout-nav/layout-nav.component';
import { TdLayoutNavListComponent } from './layout/layout-nav-list/layout-nav-list.component';
import { TdLayoutCardOverComponent } from './layout/layout-card-over/layout-card-over.component';
import { TdLayoutManageListComponent } from './layout/layout-manage-list/layout-manage-list.component';
import { TdLayoutService } from './layout/services/layout.service';

export const TD_LAYOUT_DIRECTIVES: Type<any>[] = [
  TdLayoutComponent,
  TdLayoutNavComponent,
  TdLayoutNavListComponent,
  TdLayoutCardOverComponent,
  TdLayoutManageListComponent,
];

export const TD_LAYOUT_PROVIDERS: Type<any>[] = [
  TdLayoutService,
];

export { TdLayoutComponent } from './layout/layout.component';
export { TdLayoutNavComponent } from './layout/layout-nav/layout-nav.component';
export { TdLayoutNavListComponent } from './layout/layout-nav-list/layout-nav-list.component';
export { TdLayoutCardOverComponent } from './layout/layout-card-over/layout-card-over.component';
export { TdLayoutManageListComponent }  from './layout/layout-manage-list/layout-manage-list.component';

// Steps
import { TdStepsComponent } from './steps/steps.component';
import { TdStepComponent, TdStepActionsComponent, TdStepSummaryComponent } from './steps/step.component';

export const TD_STEPS_DIRECTIVES: Type<any>[] = [
  TdStepsComponent,
  TdStepComponent,
  TdStepActionsComponent,
  TdStepSummaryComponent,
];

export { TdStepComponent, StepState } from './steps/step.component';
export { TdStepsComponent, IStepChangeEvent } from './steps/steps.component';

// Loading
import { TdLoadingService } from './loading/services/loading.service';
import { TdLoadingDirective } from './loading/directives/loading.directive';
import { TdLoadingComponent } from './loading/loading.component';

export const TD_LOADING_ENTRY_COMPONENTS: Type<any>[] = [
  TdLoadingComponent,
];

export { LoadingType, LoadingMode } from './loading/loading.component';
export { TdLoadingService, ILoadingOptions } from './loading/services/loading.service';

// Expansion
export { TdExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

import { TdExpansionPanelComponent,
         TdExpansionPanelSummaryComponent } from './expansion-panel/expansion-panel.component';

export const TD_EXPANSION_DIRECTIVES: Type<any>[] = [
  TdExpansionPanelComponent,
  TdExpansionPanelSummaryComponent,
];

/**
 * DIRECTIVES
 */

import { TdToggleDirective } from './directives/toggle/toggle.directive';
import { TdFadeDirective } from './directives/fade/fade.directive';

export { TdToggleDirective } from './directives/toggle/toggle.directive';
export { TdFadeDirective } from './directives/fade/fade.directive';

/**
 * PIPES
 */
import { TdOrderByPipe } from './pipes/orderby/orderby.pipe';
import { TdTimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { TdTimeDifferencePipe } from './pipes/time-difference/time-difference.pipe';
import { TdBytesPipe } from './pipes/bytes/bytes.pipe';
import { TdDigitsPipe } from './pipes/digits/digits.pipe';
import { TdTruncatePipe } from './pipes/truncate/truncate.pipe';

export const TD_PIPES: Type<any>[] = [
  TdOrderByPipe,
  TdTimeAgoPipe,
  TdTimeDifferencePipe,
  TdBytesPipe,
  TdDigitsPipe,
  TdTruncatePipe,
];

export { TdOrderByPipe } from './pipes/orderby/orderby.pipe';
export { TdTimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
export { TdTimeDifferencePipe } from './pipes/time-difference/time-difference.pipe';
export { TdBytesPipe } from './pipes/bytes/bytes.pipe';
export { TdDigitsPipe } from './pipes/digits/digits.pipe';
export { TdTruncatePipe } from './pipes/truncate/truncate.pipe';

/**
 * MEDIA
 */
import { TdMediaService } from './media/services/media.service';
import { TdMediaToggleDirective } from './media/directives/media-toggle.directive';

export { TdMediaService } from './media/services/media.service';
export { TdMediaToggleDirective } from './media/directives/media-toggle.directive';

@NgModule({
  imports: [
    HttpModule,
    JsonpModule,
    FormsModule,
    CommonModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    TdMediaToggleDirective,
    TD_PIPES,
    TD_LAYOUT_DIRECTIVES,
    TdLoadingDirective,
    TdLoadingComponent,
    TD_STEPS_DIRECTIVES,
    TD_EXPANSION_DIRECTIVES,
    TdFadeDirective,
    TdToggleDirective,
  ],
  exports: [
    HttpModule,
    JsonpModule,
    FormsModule,
    CommonModule,
    MaterialModule,

    TdMediaToggleDirective,
    TD_PIPES,
    TD_LAYOUT_DIRECTIVES,
    TdLoadingDirective,
    TdLoadingComponent,
    TD_STEPS_DIRECTIVES,
    TD_EXPANSION_DIRECTIVES,
    TdFadeDirective,
    TdToggleDirective,
  ],
})
export class CovalentCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CovalentCoreModule,
      providers: [ TdMediaService, TdLayoutService, TdLoadingService ],
    };
  }
}
