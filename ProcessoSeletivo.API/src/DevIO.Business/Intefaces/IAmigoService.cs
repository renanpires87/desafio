using DevIO.Business.Models;
using System;
using System.Threading.Tasks;

namespace DevIO.Business.Intefaces
{
    public interface IAmigoService : IDisposable
    {
        Task<bool> Adicionar(Amigo amigo);
        Task<bool> Atualizar(Amigo amigo);
        Task<bool> Remover(Guid id);
    }
}
