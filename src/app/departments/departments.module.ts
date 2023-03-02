import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddDepartmentComponent } from './add-department.component';
import { AddRequestComponent } from './add-request.component';
import { AddOfferComponent } from './add-offer.component';
import { AccordionModule, BadgeModule, ButtonModule, FormModule, ModalModule, SharedModule, TableModule, UtilitiesModule } from '@coreui/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DepartmentsRoutingModule,
        ModalModule,
        AccordionModule,
        TableModule,
        BadgeModule,
        UtilitiesModule,
        FormModule,
        ButtonModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddDepartmentComponent,
        AddRequestComponent,
        AddOfferComponent,

    ]
})
export class DepartmentsModule { }
