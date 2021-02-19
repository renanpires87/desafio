import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Amigo } from 'src/app/amigo/models/amigo';
import { AmigoService } from 'src/app/amigo/services/amigo.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Jogo } from '../models/jogo';
import { JogoService } from '../services/jogo.service';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  jogoForm: FormGroup;
  jogo: Jogo;
  amigos: Amigo[] = [];

  formResult: string = '';

  constructor(private fb: FormBuilder,
    private jogoService: JogoService,
    private amigoService: AmigoService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);

    this.jogo = this.route.snapshot.data['jogo'] ? this.route.snapshot.data['jogo'] : new Jogo();
  }

  ngOnInit() {

    this.amigoService.obterTodos()
      .subscribe(
        amigos => this.amigos = amigos);

    this.jogoForm = this.fb.group({
      nome: ['', [Validators.required]],
      amigoId: [null],
    });

    if (this.jogo) {
      this.spinner.show();
      this.preencherForm();

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
  }

  preencherForm() {
    this.jogoForm.patchValue({
      id: this.jogo.id,
      nome: this.jogo.nome,
      amigoId: this.jogo.amigoId
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.jogoForm)
  }

  adicionarJogo() {
    if (this.jogoForm.dirty && this.jogoForm.valid) {

      this.jogo = Object.assign({}, this.jogo, this.jogoForm.value);
      this.formResult = JSON.stringify(this.jogo);

      if (this.jogo.id) { this.atualizar(); }
      else { this.criarNovo(); }
    }
  }

  atualizar() {
    this.jogoService.atualizar(this.jogo)
      .subscribe(
        sucesso => { this.processarSucesso('Jogo atualizado com sucesso!') },
        falha => { this.processarFalha(falha) }
      );
  }

  criarNovo() {
    this.jogoService.novo(this.jogo)
      .subscribe(
        sucesso => { this.processarSucesso('Jogo cadastrado com sucesso!') },
        falha => { this.processarFalha(falha) }
      );
  }

  processarSucesso(mensagem: string) {
    this.jogoForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success(mensagem, 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/jogos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
