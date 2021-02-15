using DevIO.Business.Intefaces;
using DevIO.Business.Models;
using DevIO.Business.Models.Validations;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DevIO.Business.Services
{
    public class JogoService : BaseService, IJogoService
    {
        private readonly IJogoRepository _jogoRepository;

        public JogoService(IJogoRepository jogoRepository, INotificador notificador) : base(notificador)
        {
            _jogoRepository = jogoRepository;
        }
        public async Task<bool> Adicionar(Jogo jogo)
        {
            if (!ExecutarValidacao(new JogoValidation(), jogo)) return false;

            if (_jogoRepository.Buscar(x => x.Nome == jogo.Nome).Result.Any())
            {
                Notificar("Já existe um jogo com esse nome informado.");
                return false;
            }

            await _jogoRepository.Adicionar(jogo);
            return true;
        }

        public async Task<bool> Atualizar(Jogo jogo)
        {
            if (!ExecutarValidacao(new JogoValidation(), jogo)) return false;

            if (_jogoRepository.Buscar(x => x.Nome == jogo.Nome && x.Id != jogo.Id).Result.Any())
            {
                Notificar("Já existe um jogo com esse nome informado.");
                return false;
            }

            await _jogoRepository.Atualizar(jogo);
            return true;
        }

        public async Task<bool> Remover(Guid id)
        {
            await _jogoRepository.Remover(id);
            return true;
        }

        public void Dispose()
        {
            _jogoRepository?.Dispose();
        }
    }
}
