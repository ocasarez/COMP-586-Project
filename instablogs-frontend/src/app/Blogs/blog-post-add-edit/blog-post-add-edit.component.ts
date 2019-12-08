import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog } from '../../models/blog';
import { BlogPostService } from '../../Services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

interface Claim {
  claim: String,
  value: String
}


@Component({
  selector: 'app-blog-post-add-edit',
  templateUrl: './blog-post-add-edit.component.html',
  styleUrls: ['./blog-post-add-edit.component.css']
})
export class BlogPostAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formContent: string;
  id: number;
  errorMessage: any;
  existingBlogPost: Blog;
  claims: Array<Claim>
  currentUser: string;

  constructor(private blogPostService: BlogPostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, public oktaAuth: OktaAuthService) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formContent = 'content';
    if(this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
      }
    )
  }

  async ngOnInit() {
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.blogPostService.getBlogPost(this.id)
        .subscribe(data => (
          this.existingBlogPost = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formContent].setValue(data.content)
        ));
    }
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
    let claim;
    for(claim of  this.claims){
      if(claim.claim === 'authorID'){
        this.currentUser = claim.value;
      }
    }
  }

  async save() {
    if (!this.form.valid) {
      return;
    }
    if (this.actionType === 'Add') {
      let blogPost: Blog = {
        timeStamp: this.currentDay(),
        username: this.currentUser,
        title: this.form.get(this.formTitle).value,
        content: this.form.get(this.formContent).value
      };

      this.blogPostService.saveBlogPost(blogPost)
        .subscribe((data) => {
          this.router.navigate(['/blogpost', data.id]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get content() { return this.form.get(this.formContent); }

  currentDay() {
    var date = new Date(Date.now());
    return date.toString();
  }
}
