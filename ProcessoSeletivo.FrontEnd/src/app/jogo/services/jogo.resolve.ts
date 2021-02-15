import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Jogo } from '../models/jogo';
import { JogoService } from './jogo.service';

@Injectable()
export class JogoResolve implements Resolve<Jogo> {

    constructor(private jogoService: JogoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.jogoService.obterPorId(route.params['id']);
    }
}