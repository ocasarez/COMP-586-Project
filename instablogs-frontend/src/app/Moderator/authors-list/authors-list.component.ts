import { Component, OnInit } from '@angular/core';
import { OktaApiService } from '../../Services/okta-api.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authors$: any;

  constructor(private OktaApiService: OktaApiService) { 
  }

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    return this.OktaApiService.getUsersFromAuthorsGroup().subscribe((data) => {
      console.log(data);
      this.authors$ = data;
    })
  }

}
