using DevIO.Business.Intefaces;
using DevIO.Business.Models;
using DevIO.Data.Context;

namespace DevIO.Data.Repository
{
    public class JogoRepository : Repository<Jogo>, IJogoRepository
    {
        public JogoRepository(MeuDbContext context) : base(context)
        {

        }
    }
}
