import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { APIENDPOINT } from '../../config/configuration';
import { UserService } from '../../services/users/user.service';
import { BusinessResultModel } from 'src/app/models/businessresult.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public isCollapsed = true;
  public newUser: FormGroup;
  public userModel: UserModel;
  public response: BusinessResultModel<UserModel[]>;
  @Output() emitUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.validateForm();
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
    this.newUser = new FormGroup({
      UserName,
      UserPass
    });
  }

  saveUser() {
      this.userModel = this.newUser.value;
      this.userService.post(APIENDPOINT.user, this.userModel).
      subscribe((resp: any) => {
        this.response = resp;
        if (this.response.SuccessfulOperation) {
          this.userModel = resp.Result;
          this.newUser.reset();
          this.emitUser.emit(this.userModel);
        } else {
          alert(this.response.Message);
        }
      });
  }

}
