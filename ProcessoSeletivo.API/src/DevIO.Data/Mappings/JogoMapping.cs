using DevIO.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DevIO.Data.Mappings
{
    public class JogoMapping : IEntityTypeConfiguration<Jogo>
    {
        public void Configure(EntityTypeBuilder<Jogo> builder)
        {
            builder.HasKey(jogo => jogo.Id);

            builder.Property(jogo => jogo.Nome)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.HasOne(jogo => jogo.Amigo)
                .WithMany(amigo => amigo.Jogos)
                .HasForeignKey(jogo => jogo.AmigoId);
            

            builder.ToTable("Jogos");
        }
    }
}
