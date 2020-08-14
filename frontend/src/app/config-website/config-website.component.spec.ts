/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SlideshowModule } from 'ng-simple-slideshow'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatCardModule } from '@angular/material/card'
import { ConfigWebsiteComponent } from './config-website.component'
import { MatInputModule } from '@angular/material/input'
import { CookieService } from 'ngx-cookie-service'

xdescribe('ConfigWebsiteComponent', () => {
  let component: ConfigWebsiteComponent
  let fixture: ComponentFixture<ConfigWebsiteComponent>
  let cookieService: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SlideshowModule,
        MatCardModule,
        MatInputModule
      ],
      declarations: [ ConfigWebsiteComponent ]
    })
      .compileComponents()
      cookieService = jasmine.createSpyObj('CookieService',['delete'])
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWebsiteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
