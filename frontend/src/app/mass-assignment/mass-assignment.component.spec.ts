/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SlideshowModule } from 'ng-simple-slideshow'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatCardModule } from '@angular/material/card'
import { MassAssignmentComponent } from './mass-assignment.component'
import { MatInputModule } from '@angular/material/input'

xdescribe('MassAssignmentComponent', () => {
  let component: MassAssignmentComponent
  let fixture: ComponentFixture<MassAssignmentComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SlideshowModule,
        MatCardModule,
        MatInputModule
      ],
      declarations: [ MassAssignmentComponent ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MassAssignmentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
