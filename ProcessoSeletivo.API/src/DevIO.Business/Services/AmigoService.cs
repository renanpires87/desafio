using DevIO.Business.Intefaces;
using DevIO.Business.Models;
using DevIO.Business.Models.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevIO.Business.Services
{
    public class AmigoService : BaseService, IAmigoService
    {
        private readonly IAmigoRepository _amigoRepository;
        public AmigoService(IAmigoRepository amigoRepository, INotificador notificador) : base (notificador)
        {
            _amigoRepository = amigoRepository;
        }

        public async Task<bool> Adicionar(Amigo amigo)
        {
            if (!ExecutarValidacao(new AmigoValidation(), amigo)) return false;

            if (_amigoRepository.Buscar(x => x.Nome == amigo.Nome).Result.Any())
            {
                Notificar("Já existe um amigo com esse nome informado.");
                return false;
            }

            await _amigoRepository.Adicionar(amigo);
            return true;
        }

        public async Task<bool> Atualizar(Amigo amigo)
        {
            if (!ExecutarValidacao(new AmigoValidation(), amigo)) return false;

            if (_amigoRepository.Buscar(x => x.Nome == amigo.Nome && x.Id != amigo.Id).Result.Any())
            {
                Notificar("Já existe um amigo com esse nome informado.");
                return false;
            }

            await _amigoRepository.Atualizar(amigo);
            return true;
        }

        public async Task<bool> Remover(Guid id)
        {
            await _amigoRepository.Remover(id);
            return true;
        }

        public void Dispose()
        {
            _amigoRepository?.Dispose();
        }

    }
}
