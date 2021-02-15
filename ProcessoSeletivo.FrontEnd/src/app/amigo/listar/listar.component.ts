import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Amigo } from '../models/amigo';
import { AmigoService } from '../services/amigo.service';

import { utilsBr } from 'js-brasil';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public amigos: Amigo[];
  errorMessage: string;
  MASKS = utilsBr.MASKS;

  constructor(private amigoService: AmigoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.amigoService.obterTodos()
      .subscribe(
        amigos => this.amigos = amigos,
        error => this.errorMessage);
  }

  excluir(id: string) {
    if (window.confirm('Tem certeza que excluir esse amigo?')) {
      this.amigoService.excluir(id)
        .subscribe(
          sucesso => {
            this.toastr.success('Excluido com sucesso!');
            this.amigos.splice(this.amigos.findIndex(x => x.id === id), 1);
          },
          falha => { this.toastr.error('Ocorreu um erro!', 'Opa :('); }
        )
    }
  }

}
