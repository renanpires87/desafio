import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigoAppComponent } from './amigo.app.component';
import { CriarComponent } from './criar/criar.component';
import { ListarComponent } from './listar/listar.component';
import { AmigoGuard } from './services/amigo.guard';
import { AmigoResolve } from './services/amigo.resolve';

const amigoRouterConfig: Routes = [
    {
        path: '', component: AmigoAppComponent,
        children: [
            {
                path: 'listar-todos', component: ListarComponent
            },
            {
                path: 'adicionar-novo', component: CriarComponent,
                canDeactivate: [AmigoGuard],
                canActivate: [AmigoGuard]
            },
            {
                path: 'editar/:id', component: CriarComponent,
                canActivate: [AmigoGuard],
                resolve: {
                    amigo: AmigoResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(amigoRouterConfig)
    ],
    exports: [RouterModule]
})
export class AmigoRoutingModule { }