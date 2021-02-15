using DevIO.Business.Models;
using System;
using System.Threading.Tasks;

namespace DevIO.Business.Intefaces
{
    public interface IJogoService : IDisposable
    {
        Task<bool> Adicionar(Jogo jogo);
        Task<bool> Atualizar(Jogo jogo);
        Task<bool> Remover(Guid id);
    }
}
