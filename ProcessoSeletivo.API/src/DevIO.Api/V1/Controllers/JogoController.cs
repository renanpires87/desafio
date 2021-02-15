using AutoMapper;
using DevIO.Api.Controllers;
using DevIO.Api.ViewModels;
using DevIO.Business.Intefaces;
using DevIO.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DevIO.Api.V1.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/jogos")]
    public class JogoController : MainController
    {
        private readonly IMapper _mapper;
        private readonly IJogoRepository _jogoRepository;
        private readonly IJogoService _jogoService;

        public JogoController(IMapper mapper,
                              INotificador notificador,
                              IUser user,
                              IJogoRepository jogoRepository,
                              IJogoService jogoService) : base(notificador, user)
        {
            _mapper = mapper;
            _jogoRepository = jogoRepository;
            _jogoService = jogoService;
        }

        [HttpGet]
        public async Task<IEnumerable<JogoViewModel>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<JogoViewModel>>(await _jogoRepository.ObterTodos());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<JogoViewModel>> ObterPorId(Guid id)
        {
            var jogoViewModel = _mapper.Map<JogoViewModel>(await _jogoRepository.ObterPorId(id));

            if (jogoViewModel == null) return NotFound();

            return jogoViewModel;
        }

        [HttpPost]
        public async Task<ActionResult<JogoViewModel>> Adicionar(JogoViewModel jogoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _jogoService.Adicionar(_mapper.Map<Jogo>(jogoViewModel));

            return CustomResponse(jogoViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<JogoViewModel>> Atualizar(Guid id, JogoViewModel jogoViewModel)
        {
            if (id != jogoViewModel.Id)
            {
                NotificarErro("Os ids informados não são iguais!");
                return CustomResponse();
            }

            var jogoAtualizacao = await _jogoRepository.ObterPorId(id);
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            jogoAtualizacao.AtualizarJogo(_mapper.Map<Jogo>(jogoViewModel));

            await _jogoService.Atualizar(jogoAtualizacao);

            return CustomResponse(_mapper.Map<JogoViewModel>(jogoAtualizacao));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<JogoViewModel>> Excluir(Guid id)
        {
            var jogo = await _jogoRepository.ObterPorId(id);

            if (jogo == null) return NotFound();

            await _jogoService.Remover(id);

            return CustomResponse(_mapper.Map<JogoViewModel>(jogo));
        }
    }
}
