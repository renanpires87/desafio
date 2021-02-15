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
    [Route("api/v{version:apiVersion}/amigos")]
    public class AmigosController : MainController
    {
        private readonly IMapper _mapper;
        private readonly IAmigoRepository _amigoRepository;
        private readonly IAmigoService _amigoService;

        public AmigosController(IMapper mapper,
                                INotificador notificador,
                                IUser user,
                                IAmigoRepository amigoRepository,
                                IAmigoService amigoService) : base(notificador, user)
        {
            _mapper = mapper;
            _amigoRepository = amigoRepository;
            _amigoService = amigoService;
        }

        [HttpGet]
        public async Task<IEnumerable<AmigoViewModel>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<AmigoViewModel>>(await _amigoRepository.ObterTodos());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AmigoViewModel>> ObterPorId(Guid id)
        {
            var amigoViewModel = _mapper.Map<AmigoViewModel>(await _amigoRepository.ObterPorId(id));

            if (amigoViewModel == null) return NotFound();

            return amigoViewModel;
        }

        [HttpPost]
        public async Task<ActionResult<AmigoViewModel>> Adicionar(AmigoViewModel amigoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _amigoService.Adicionar(_mapper.Map<Amigo>(amigoViewModel));

            return CustomResponse(amigoViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<AmigoViewModel>> Atualizar(Guid id, AmigoViewModel amigoViewModel)
        {
            if (id != amigoViewModel.Id)
            {
                NotificarErro("Os ids informados não são iguais!");
                return CustomResponse();
            }

            var amigoAtualizacao = await _amigoRepository.ObterPorId(id);
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            amigoAtualizacao.AtualizarAmigo(_mapper.Map<Amigo>(amigoViewModel));

            await _amigoService.Atualizar(amigoAtualizacao);

            return CustomResponse(_mapper.Map<AmigoViewModel>(amigoAtualizacao));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<AmigoViewModel>> Excluir(Guid id)
        {
            var amigo = await _amigoRepository.ObterPorId(id);

            if (amigo == null) return NotFound();

            await _amigoService.Remover(id);

            return CustomResponse(_mapper.Map<AmigoViewModel>(amigo));
        }

    }
}
