import { Component, OnInit } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { UserService } from '../../services/users/user.service';
import { UserModel } from 'src/app/models/user.model';
import { BusinessResultModel } from 'src/app/models/businessresult.model';
import * as _ from 'lodash';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList: UserModel[] = [];
  public userModel: UserModel;
  public updateUser: FormGroup;
  public response: BusinessResultModel<UserModel[]>;


  constructor(private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.validateForm();
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

openSm(content, user) {
  this.userModel = user;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true});
}

editUser() {
  this.userModel.Username = this.updateUser.value.UserName;
  this.userModel.Userpass = this.updateUser.value.UserPass;
  console.log('editUser ', this.userModel);
  this.userService.put(`${APIENDPOINT.user}/${this.userModel.Id}`, '', this.userModel).
  subscribe((resp: any) => {
    this.response = resp;
    if (this.response.SuccessfulOperation) {
      this.ConsumeUserServiceGetAll();
      this.modalService.dismissAll();
    } else {
      alert(this.response.Message);
    }
  });
}

validateForm() {

  const validCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]\S{8,15}$/;

  // tslint:disable-next-line:prefer-const
  let UserName = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(10)
    ]);
  // tslint:disable-next-line:prefer-const
  let UserPass = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(10),
      Validators.pattern(validCharacters)
    ]);

  const Id = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(10)
    ]);

  this.updateUser = new FormGroup({
    UserName,
    UserPass,
    Id
  });
}

}
