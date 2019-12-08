import { Component, OnInit } from '@angular/core';
import { OktaApiService } from '../../Services/okta-api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../Services/author.service';

@Component({
  selector: 'app-revoke-access',
  templateUrl: './revoke-access.component.html',
  styleUrls: ['./revoke-access.component.css']
})
export class RevokeAccessComponent implements OnInit {
  form: FormGroup;
  formAuthorId: string;
  formUsername: string;
  errorMessage: string;
  
  constructor(private OktaApiService: OktaApiService, private formBuilder: FormBuilder, private AuthorService: AuthorService, private router: Router) { 
    this.formAuthorId = 'removeAuthorId';
    this.formUsername = 'username';
    this.form = this.formBuilder.group(
      {
        removeAuthorId: ['', [Validators.required]],
        username: ['', [Validators.required]]
      }
    )
  }

  ngOnInit() {
  }

  revokeAccess(){
    if (!this.form.valid) {
      return;
    }

    let userName = this.form.get(this.formUsername).value;
    let userId = this.form.get(this.formAuthorId).value;

    this.AuthorService.deleteAuthor(userName)
      .subscribe((data) => {
        this.router.navigate([this.router.url]);
      });

    this.OktaApiService.removeAuthorAccess(userId)
      .subscribe((data) => {
        this.router.navigate([this.router.url]);
      });
  }

}
