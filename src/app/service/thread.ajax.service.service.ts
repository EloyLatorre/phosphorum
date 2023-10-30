import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IThread, IThreadPage } from '../model/model.interfaces';

@Injectable()
export class ThreadAjaxService {
  private sUrl: string = "http://localhost:8083/thread";

  constructor(private oHttpClient: HttpClient) {}

  // Get a single thread by ID
  getOne(id: number): Observable<IThread> {
    return this.oHttpClient.get<IThread>(`${this.sUrl}/${id}`);
  }

  // Get a page of threads with optional size, page, sorting field, and direction
  getPage(
    size: number = 10,
    page: number = 0,
    orderField: string,
    orderDirection: string
  ): Observable<IThreadPage> {
    return this.oHttpClient.get<IThreadPage>(
      `${this.sUrl}?size=${size}&page=${page}&sort=${orderField},${orderDirection}`
    );
  }

  // Remove a thread by ID
  removeOne(id: number): Observable<number> {
    if (id) {
      return this.oHttpClient.delete<number>(`${this.sUrl}/${id}`);
    } else {
      // Return an empty observable or handle the error as needed
      return new Observable<number>();
    }
  }
}
