/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ConfigurationService } from '../Services/configuration.service'
import { ConfigWebsiteService } from '../Services/config-website.service'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { FormControl, Validators } from '@angular/forms'
import { FormSubmitService } from '../Services/form-submit.service'
import { CookieService } from 'ngx-cookie-service'

dom.watch()

@Component({
  selector: 'config-website-as',
  templateUrl: './config-website.component.html',
  styleUrls: ['./config-website.component.scss']
})
export class ConfigWebsiteComponent implements OnInit {

  public configwebsiteControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public authorControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public messageControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public feedback: any = undefined
  public confirmation: any
  public error: any
  public guestbooks: any
  public guestbook_content: any

  constructor (private configurationService: ConfigurationService, private cookieService: CookieService, private ConfigWebsiteService: ConfigWebsiteService, private sanitizer: DomSanitizer, private formSubmitService: FormSubmitService) {}

  ngOnInit () {
    this.cookieService.set('kikou-cookie', "hey")
    this.feedback = {}
    this.formSubmitService.attachEnterKeyHandler('guestbook-form', 'submitButton', () => this.save())
  }

  save () {
    this.feedback.comment = `${this.configwebsiteControl.value}`
    this.feedback.author = `${this.authorControl.value}`
  
    this.ConfigWebsiteService.save('<xml><root><comment>'+this.feedback.comment+'</comment><author>'+this.feedback.author+'</author></root></xml>').subscribe((savedFeedback) => {
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
    this.configwebsiteControl.markAsUntouched()
    this.configwebsiteControl.markAsPristine()
    this.configwebsiteControl.setValue('')
  }

  muhaha () {
    console.log('muhaha')
  }
}
