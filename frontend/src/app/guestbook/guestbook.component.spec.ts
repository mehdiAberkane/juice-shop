/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SlideshowModule } from 'ng-simple-slideshow'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatCardModule } from '@angular/material/card'
import { GuestBookComponent } from './guestbook.component'
import { MatInputModule } from '@angular/material/input'

xdescribe('GuestBookComponent', () => {
  let component: GuestBookComponent
  let fixture: ComponentFixture<GuestBookComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SlideshowModule,
        MatCardModule,
        MatInputModule
      ],
      declarations: [ GuestBookComponent ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
