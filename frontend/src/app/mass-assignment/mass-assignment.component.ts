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
import { SqliService } from '../Services/sqli.service'

dom.watch()

@Component({
  selector: 'mass-as',
  templateUrl: './mass-assignment.component.html',
  styleUrls: ['./mass-assignment.component.scss']
})
export class MassAssignmentComponent implements OnInit {

  public feedbackControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public authorControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public emailControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public messageControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public feedback: any = undefined
  public confirmation: any
  public error: any

  constructor (private configurationService: ConfigurationService, private SqliService: SqliService, private Contact_AG2RService: Contact_AG2RService, private sanitizer: DomSanitizer, private formSubmitService: FormSubmitService) {}

  ngOnInit () {
    this.SqliService.getProduct('fdsfdfdsqdsqddff/contact-ag2r').subscribe((log) => {
      console.log(log)
    })

    this.feedback = {}
    this.formSubmitService.attachEnterKeyHandler('feedback-form', 'submitButton', () => this.save())
    this.feedback.datecreated = "salut"
  }

  save () {
    this.feedback.comment = `${this.feedbackControl.value}`
    this.feedback.author = `${this.authorControl.value}`
    this.feedback.email =`${this.emailControl.value}`

    
    this.Contact_AG2RService.save(this.feedback).subscribe((savedFeedback) => {
      this.confirmation = savedFeedback.reponse
      this.feedback = {}
      this.ngOnInit()
      this.resetForm()
    }, (err) => {
      console.log("mes erreurs" + err)
      this.feedback = {}
    })
  }

  resetForm () {
    this.feedbackControl.markAsUntouched()
    this.feedbackControl.markAsPristine()
    this.feedbackControl.setValue('')
  }
}
