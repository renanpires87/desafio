import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, Observer } from 'rxjs';
import { Amigo } from '../models/amigo';
import { AmigoService } from './amigo.service';

const amigos: Amigo[] = [
    {
        id: "3123123",
        nome: "Renan",
        telefone: "99999999999"
    }];

function createResponse(body) {
    return Observable.create((observer: Observer<any>) => {
        observer.next(body);
    });
}

class MockHttp {
    get() {
        return createResponse(amigos);
    }
}

describe('amigoService', () => {

    let service: AmigoService;
    let http: HttpClient;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useClass: MockHttp },
                AmigoService
            ]
        });
        http = bed.get(HttpClient);
        service = bed.get(AmigoService);

    });

    it('Deve retornar lista de Amigos', () => {
        service.obterTodos()
        .subscribe((result) => {
            expect(result.length).toBe(1);
            expect(result).toEqual(amigos);
        });
    });

});