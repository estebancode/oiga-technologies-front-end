import { Component, OnInit } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { UserService } from '../../services/users/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public userList: UserModel[] = [];


  constructor(private userService: UserService) { }

  ngOnInit() {

 }

}
