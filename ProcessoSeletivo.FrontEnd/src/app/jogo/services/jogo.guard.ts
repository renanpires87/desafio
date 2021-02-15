import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';
import { CriarComponent } from '../criar/criar.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class JogoGuard extends BaseGuard implements CanActivate, CanDeactivate<CriarComponent> {

    constructor(protected router: Router) { super(router); }

    canDeactivate(component: CriarComponent) {
        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }        
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validarClaims(routeAc);
    }  
}