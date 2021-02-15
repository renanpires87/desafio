import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Amigo } from '../models/amigo';
import { AmigoService } from './amigo.service';

@Injectable()
export class AmigoResolve implements Resolve<Amigo> {

    constructor(private amigoService: AmigoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.amigoService.obterPorId(route.params['id']);
    }
}