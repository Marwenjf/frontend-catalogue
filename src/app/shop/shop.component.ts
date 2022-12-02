import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
  }

  handleLogout(){
    this.authenticationService.logout().subscribe({
      next:(data)=>{
        this.router.navigateByUrl('/login');
      }
    });
  }
}
