import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BusinessResultModel } from '../models/businessresult.model';


export abstract class BaseService<TModel> {

    public headers: HttpHeaders;
    public API_ROOT = environment.apiURL;

    constructor(protected httpClient: HttpClient) {
    }

    // get all
    public getAll(endPoint: string, queryString: string = '') {
        return this.httpClient.get<BusinessResultModel<TModel[]>>(`${this.API_ROOT}${endPoint}${queryString}`, { headers: this.headers })
            .pipe(map(resp => {
                return resp;
            }, error => {
                console.log(error);
            }));
    }

// get
    public get(endPoint: string, queryString: string = '') {
        return this.httpClient.get<BusinessResultModel<TModel[]>>(`${this.API_ROOT}${endPoint}${queryString}`, { headers: this.headers })
            .pipe(map(resp => {
                return resp;
            }, error => {
                console.log(error);
            }));
    }

// post
    public post(endPoint: string, object: TModel) {
        // this.headers = new HttpHeaders({
        //     'Content-Type': '*'
        // });
        return this.httpClient.post<BusinessResultModel<TModel[]>>(`${this.API_ROOT}${endPoint}`, object, { headers: this.headers })
            .pipe(map(resp => {
                return resp;
            }, error => {
                console.log(error);
            }));
    }

    // put
    public put(endPoint: string, queryString: string = '', object: TModel) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.put<BusinessResultModel<TModel[]>>(`${this.API_ROOT}${endPoint}${queryString}`, object, { headers: this.headers })
            .pipe(map(resp => {
                return resp;
            }, error => {
                console.log(error);
            }));
    }

    // delete
    public delete(endPoint: string, queryString: string = '') {
        return this.httpClient.delete<BusinessResultModel<TModel[]>>(`${this.API_ROOT}${endPoint}${queryString}`, { headers: this.headers })
            .pipe(map(resp => {
                return resp;
            }, error => {
                console.log(error);
            }));
    }
}
