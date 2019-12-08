import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../Services/blog-post.service';
import { Blog } from '../../models/blog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  blogPost$: Observable<Blog>;
  id: number;

  constructor(private blogPostService: BlogPostService, private activeRoute: ActivatedRoute) {
    const idParam = 'id';
    if(this.activeRoute.snapshot.params[idParam]) {
      this.id = this.activeRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadBlogPost();
  }

  loadBlogPost() {
    this.blogPost$ = this.blogPostService.getBlogPost(this.id);
  }
}
