import { Component, OnInit } from '@angular/core';
import { OktaApiService } from '../../Services/okta-api.service';

@Component({
  selector: 'app-viewers-list',
  templateUrl: './viewers-list.component.html',
  styleUrls: ['./viewers-list.component.css']
})
export class ViewersListComponent implements OnInit {
  viewers$: any;

  constructor(private OktaApiService: OktaApiService) { }

  ngOnInit() {
    this.loadViewers();
  }

  loadViewers() {
    return this.OktaApiService.getUsersFromViewersGroup().subscribe((data) => {
      console.log(data);
      this.viewers$ = data;
    })
  }

}
