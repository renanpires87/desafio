import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JogoAppComponent } from './jogo.app.component';
import { CriarComponent } from './criar/criar.component';
import { ListarComponent } from './listar/listar.component';
import { JogoGuard } from './services/jogo.guard';
import { JogoResolve } from './services/jogo.resolve';

const jogoRouterConfig: Routes = [
    {
        path: '', component: JogoAppComponent,
        children: [
            {
                path: 'listar-todos', component: ListarComponent
            },
            {
                path: 'adicionar-novo', component: CriarComponent,
                canDeactivate: [JogoGuard],
                canActivate: [JogoGuard],
            },
            {
                path: 'editar/:id', component: CriarComponent,
                canActivate: [JogoGuard],
                resolve: {
                    jogo: JogoResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(jogoRouterConfig)
    ],
    exports: [RouterModule]
})
export class JogoRoutingModule { }