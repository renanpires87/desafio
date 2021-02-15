using System;

namespace DevIO.Business.Models
{
    public class Jogo : Entity
    {
        public string Nome { get; private set; }
        public Guid? AmigoId { get; private set; }

        /* EF Relation */
        public Amigo Amigo { get; private set; }

        #region Metodos

        public void AtualizarJogo(Jogo jogo)
        {
            Nome = jogo.Nome;
            AmigoId = jogo.AmigoId;
        }

        public void AlterarNome(string nome) => Nome = nome;

        public void AlterarAmigoId(Guid? Id) => AmigoId = Id;

        #endregion
    }
}
