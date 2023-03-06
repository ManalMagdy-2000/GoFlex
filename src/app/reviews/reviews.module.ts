import { NgModule } from '@angular/core';
import { AccordionModule, SharedModule } from '@coreui/angular';
import { ReviewComponent } from './reviews.component';

@NgModule({
  imports: [
    AccordionModule,
    SharedModule
  ]
})
export class RequestModule {}
