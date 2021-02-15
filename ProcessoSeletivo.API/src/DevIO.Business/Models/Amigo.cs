using System.Collections.Generic;

namespace DevIO.Business.Models
{
    public class Amigo : Entity
    {
        public string Nome { get; private set; }
        public string Telefone { get; private set; }

        /* EF Relation */
        public IEnumerable<Jogo> Jogos { get; set; }

        #region Metodos

        public void AtualizarAmigo(Amigo amigo)
        {
            Nome = amigo.Nome;
            Telefone = amigo.Telefone;
        }

        public void AlterarNome(string nome) => Nome = nome;

        public void AlterarTelefone(string telefone) => Telefone = telefone;

        #endregion
    }
}
