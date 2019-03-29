import { Component, OnInit } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { UserService } from '../../services/users/user.service';
import { UserModel } from 'src/app/models/user.model';
import { BusinessResultModel } from 'src/app/models/businessresult.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList: UserModel[] = [];
  public response: BusinessResultModel<UserModel[]>;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.ConsumeUserServiceGetAll();
  }

  public ConsumeUserServiceGetAll() {
    this.userService.get(APIENDPOINT.usersGetAll).
    subscribe((resp: any) => {
      this.response = resp;
      if (this.response.SuccessfulOperation === true) {
        this.userList = this.response.Result;
      }
    });
  }

  public eventGetNewUser(newUser: UserModel) {

    this.userList.push(newUser);

  }

public deleteUser(id: number) {
this.userService.delete(`${APIENDPOINT.user}/${id}`).
subscribe((resp: any) => {
  this.response = resp;
  if (this.response.SuccessfulOperation) {
    // tslint:disable-next-line:only-arrow-functions
    this.userList = _.remove(this.userList, function(n) {
      return  n.Id !== id;
    });
  }

});
}

}
