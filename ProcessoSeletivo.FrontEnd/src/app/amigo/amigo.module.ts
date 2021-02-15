import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmigoAppComponent } from './amigo.app.component';
import { AmigoRoutingModule } from './amigo.route';
import { ListarComponent } from './listar/listar.component';
import { CriarComponent } from './criar/criar.component';
import { AmigoService } from './services/amigo.service';
import { AmigoGuard } from './services/amigo.guard';
import { AmigoResolve } from './services/amigo.resolve';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AmigoAppComponent,
    ListarComponent,
    CriarComponent
  ],
  imports: [
    CommonModule,
    AmigoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    AmigoService,
    AmigoGuard,
    AmigoResolve
  ]
})
export class AmigoModule { }
