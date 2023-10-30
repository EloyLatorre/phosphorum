import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReply, IReplyPage } from '../model/model.interfaces';

@Injectable()
export class ReplyAjaxService {
  private sUrl: string = "http://localhost:8083/reply";

  constructor(private oHttpClient: HttpClient) {}

  // Get a single user by ID
  getOne(id: number): Observable<IReply> {
    return this.oHttpClient.get<IReply>(`${this.sUrl}/${id}`);
  }

  // Get a page of users with optional size, page, sorting field, and direction
  getPage(
    size: number = 10,
    page: number = 0,
    orderField: string,
    orderDirection: string
  ): Observable<IReplyPage> {
    return this.oHttpClient.get<IReplyPage>(
      `${this.sUrl}?size=${size}&page=${page}&sort=${orderField},${orderDirection}`
    );
  }

  // Remove a user by ID
  removeOne(id: number): Observable<number> {
    if (id) {
      return this.oHttpClient.delete<number>(`${this.sUrl}/${id}`);
    } else {
      // Return an empty observable or handle the error as needed
      return new Observable<number>();
    }
  }
}
