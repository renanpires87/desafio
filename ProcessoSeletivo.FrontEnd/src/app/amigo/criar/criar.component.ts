import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Amigo } from '../models/amigo';

import { utilsBr } from 'js-brasil';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AmigoService } from '../services/amigo.service';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  amigoForm: FormGroup;
  amigo: Amigo;

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private amigoService: AmigoService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      telefone: {
        required: 'Informe o Telefone',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);

    this.amigo = this.route.snapshot.data['amigo'] ? this.route.snapshot.data['amigo'] : new Amigo();
  }

  ngOnInit() {
    this.amigoForm = this.fb.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required, NgBrazilValidators.celular]],
    });

    if (this.amigo) {
      this.spinner.show();
      this.preencherForm();

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
  }

  preencherForm() {
    this.amigoForm.patchValue({
      id: this.amigo.id,
      nome: this.amigo.nome,
      telefone: this.amigo.telefone
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.amigoForm)
  }

  adicionarAmigo() {
    if (this.amigoForm.dirty && this.amigoForm.valid) {

      this.amigo = Object.assign({}, this.amigo, this.amigoForm.value);
      this.formResult = JSON.stringify(this.amigo);

      this.amigo.telefone = StringUtils.somenteNumeros(this.amigo.telefone);

      if (this.amigo.id) { this.atualizar(); }
      else { this.criarNovo(); }
        
    }
  }

  atualizar() {
    this.amigoService.atualizar(this.amigo)
    .subscribe(
      sucesso => { this.processarSucesso('Amigo atualizado com sucesso!') },
      falha => { this.processarFalha(falha) }
    );
  }

  criarNovo() {
    this.amigoService.novo(this.amigo)
    .subscribe(
      sucesso => { this.processarSucesso('Amigo cadastrado com sucesso!') },
      falha => { this.processarFalha(falha) }
    );
  }

  processarSucesso(mensagem: string) {
    this.amigoForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success(mensagem, 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/amigos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
