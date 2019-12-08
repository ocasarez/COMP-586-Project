import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

interface Claim {
  claim: String,
  value: String
}

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  isModerator: boolean;
  claims: Array<Claim>

  constructor(public oktaAuth: OktaAuthService) { 
    
  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
    let claim;
    for(claim of  this.claims){
      if(claim.claim === 'isModerator'){
        this.isModerator = claim.value;
      }
    }
  }
}
