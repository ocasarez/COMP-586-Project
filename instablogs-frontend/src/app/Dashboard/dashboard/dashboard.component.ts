import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../Services/blog-post.service';
import { OktaAuthService } from '@okta/okta-angular';

interface Claim {
  claim: String,
  value: String
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  blogPosts$: Observable<Blog[]>;
  claims: Array<Claim>
  currentUser$: string;
  isAuthor: boolean;
  isModerator: boolean;
  
  constructor(private blogPostService: BlogPostService, public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    if(userClaims != null){
      this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
      let claim;
      for(claim of this.claims){
        if(claim.claim === 'authorID'){
          this.currentUser$ = claim.value;
        } else if(claim.claim === 'isAuthor'){
          this.isAuthor = claim.value;
        } else if(claim.claim === 'isModerator'){
          this.isModerator = claim.value;
        }
      }
    }
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogPosts$ = this.blogPostService.getBlogPosts();    
  }

  deleteBlog(id: number){
    const ans = confirm('Do you want to delete blog with id: ' + id);
    if(ans) {
      this.blogPostService.deletePost(id).subscribe((data) => {
        this.loadBlogPosts();
      });
    }
  }

}
