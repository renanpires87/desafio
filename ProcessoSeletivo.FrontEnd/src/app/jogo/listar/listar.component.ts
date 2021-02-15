import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AmigoService } from 'src/app/amigo/services/amigo.service';
import { Jogo } from '../models/jogo';
import { JogoService } from '../services/jogo.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public jogos: Jogo[];
  errorMessage: string;

  constructor(private jogoService: JogoService, private amigoService: AmigoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.jogoService.obterTodos()
      .subscribe(
        jogos => this.jogos = jogos,
        error => this.errorMessage);
  }

  excluir(id: string) {
    if (window.confirm('Tem certeza que excluir o jogo?')) {
      this.jogoService.excluir(id)
        .subscribe(
          sucesso => {
            this.toastr.success('Excluido com sucesso!');
            this.jogos.splice(this.jogos.findIndex(x => x.id === id), 1);
          },
          falha => { this.toastr.error('Ocorreu um erro!', 'Opa :('); }
        )
    }
  }

  visualizarAmigo(amigoId: string, nomeJogo: string) {
    this.amigoService.obterPorId(amigoId).subscribe(
      amigo => {
        this.toastr.info(`O jogo  ${nomeJogo} está emprestado para: ${amigo.nome}`);
      },
      falha => { this.toastr.error('Ocorreu um erro!', 'Opa :('); }
    );
  }

}
