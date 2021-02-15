import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Jogo } from '../models/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Jogo[]> {
        return this.http
            .get<Jogo[]>(this.UrlServiceV1 + "jogos", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Jogo> {
        return this.http
            .get<Jogo>(this.UrlServiceV1 + "jogos/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novo(jogo: Jogo): Observable<Jogo> {
        return this.http
            .post(this.UrlServiceV1 + "jogos", jogo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizar(jogo: Jogo): Observable<Jogo> {
        return this.http
            .put(this.UrlServiceV1 + "jogos/" + jogo.id, jogo, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluir(id: string): Observable<Jogo> {
        return this.http
            .delete(this.UrlServiceV1 + "jogos/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
