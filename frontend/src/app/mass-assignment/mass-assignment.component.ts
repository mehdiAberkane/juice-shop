/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ConfigurationService } from '../Services/configuration.service'
import { Contact_AG2RService } from '../Services/contact-ag2r.service'
import { IImage } from 'ng-simple-slideshow'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faReddit, faSlack, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faNewspaper, faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { FormControl, Validators } from '@angular/forms'
import { FormSubmitService } from '../Services/form-submit.service'

dom.watch()

@Component({
  selector: 'mass-as',
  templateUrl: './mass-assignment.component.html',
  styleUrls: ['./mass-assignment.component.scss']
})
export class MassAssignmentComponent implements OnInit {

  public feedbackControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public feedback: any = undefined
  public confirmation: any
  public error: any

  constructor (private configurationService: ConfigurationService, private Contact_AG2RService: Contact_AG2RService, private sanitizer: DomSanitizer, private formSubmitService: FormSubmitService) {}

  ngOnInit () {
    this.feedback = {}
    this.formSubmitService.attachEnterKeyHandler('feedback-form', 'submitButton', () => this.save())
  }

  save () {
    this.feedback.comment = `${this.feedbackControl.value}`
    this.Contact_AG2RService.save(this.feedback).subscribe((savedFeedback) => {
      this.feedback = {}
      this.ngOnInit()
      this.resetForm()
    }, (err) => {
      this.feedback = {}
    })
  }

  resetForm () {
    this.feedbackControl.markAsUntouched()
    this.feedbackControl.markAsPristine()
    this.feedbackControl.setValue('')
  }
}
