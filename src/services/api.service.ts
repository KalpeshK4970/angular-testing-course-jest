import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInterface } from "../types/user.interface";


@Injectable()
export class ApiService{
    httpClient = inject(HttpClient);
    apiUrl = 'http://localhost:3004'

    getTags(): Observable<UserInterface[]> {
        return this.httpClient.get<UserInterface[]>(`${this.apiUrl}/tags`)
    }

    createTags(name: string): Observable<UserInterface> {
        return this.httpClient.post<UserInterface>(`${this.apiUrl}/tags`,{name});
    }
    
}