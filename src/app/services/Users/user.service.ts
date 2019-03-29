import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../_baseService';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

  constructor(
    protected httpClient: HttpClient
) {
    super(httpClient);
}
}
