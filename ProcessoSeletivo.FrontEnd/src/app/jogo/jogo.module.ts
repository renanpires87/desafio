import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoAppComponent } from './jogo.app.component';
import { JogoRoutingModule } from './jogo.route';
import { ListarComponent } from './listar/listar.component';
import { CriarComponent } from './criar/criar.component';
import { JogoService } from './services/jogo.service';
import { JogoGuard } from './services/jogo.guard';
import { JogoResolve } from './services/jogo.resolve';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [
    JogoAppComponent,
    ListarComponent,
    CriarComponent,
  ],
  imports: [
    CommonModule,
    JogoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    JogoService,
    JogoGuard,
    JogoResolve
  ]
})
export class JogoModule { }
