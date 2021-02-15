using DevIO.Business.Intefaces;
using DevIO.Business.Models;
using DevIO.Data.Context;

namespace DevIO.Data.Repository
{
    public class AmigoRepository : Repository<Amigo>, IAmigoRepository
    {
        public AmigoRepository(MeuDbContext context) : base(context)
        {

        }
    }
}
