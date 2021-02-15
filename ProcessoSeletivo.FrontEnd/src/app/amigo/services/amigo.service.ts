import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Amigo } from '../models/amigo';

@Injectable({
  providedIn: 'root'
})
export class AmigoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Amigo[]> {
        return this.http
            .get<Amigo[]>(this.UrlServiceV1 + "amigos", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Amigo> {
        return this.http
            .get<Amigo>(this.UrlServiceV1 + "amigos/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novo(amigo: Amigo): Observable<Amigo> {
        return this.http
            .post(this.UrlServiceV1 + "amigos", amigo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizar(amigo: Amigo): Observable<Amigo> {
        return this.http
            .put(this.UrlServiceV1 + "amigos/" + amigo.id, amigo, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluir(id: string): Observable<Amigo> {
        return this.http
            .delete(this.UrlServiceV1 + "amigos/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
