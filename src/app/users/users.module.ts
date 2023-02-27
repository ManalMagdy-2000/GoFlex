import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddDepartmentComponent } from './add-department.component';
import { ButtonModule } from '@coreui/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        ButtonModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddDepartmentComponent
    ]
})
export class UsersModule { }
