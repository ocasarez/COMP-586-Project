import { Component, OnInit } from '@angular/core';
import { OktaApiService } from '../../Services/okta-api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../Services/author.service';
import { Author } from '../../models/author';



@Component({
  selector: 'app-grant-access',
  templateUrl: './grant-access.component.html',
  styleUrls: ['./grant-access.component.css']
})
export class GrantAccessComponent implements OnInit {
  accessForm: FormGroup;
  formViewerId: string;
  formUsername: string;
  formFirstName: string;
  formLastName: string;
  errorMessage: string;

  constructor(private OktaApiService: OktaApiService, private formBuilder: FormBuilder, private AuthorService: AuthorService, private router: Router) { 
    this.formViewerId = 'addViewerId';
    this.formUsername = 'username';
    this.formFirstName = 'firstname';
    this.formLastName = 'lastname';
    this.accessForm = this.formBuilder.group(
      {
        addViewerId: ['', [Validators.required]],
        username: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]]
      }
    )
  }

  ngOnInit() {

  }

  grantAccess(){
    if (!this.accessForm.valid) {
      return;
    }
    let newAuthor: Author = {
      username: this.accessForm.get(this.formUsername).value,
      firstname: this.accessForm.get(this.formFirstName).value,
      lastname: this.accessForm.get(this.formLastName).value
    };

    let userId = this.accessForm.get(this.formViewerId).value;

    this.AuthorService.createAuthor(newAuthor)
      .subscribe((data) => {
        this.router.navigate([this.router.url]);
      });

    this.OktaApiService.grantAuthorAccess(userId)
      .subscribe((data) => {
        this.router.navigate([this.router.url]);
      });
  }
  
}
