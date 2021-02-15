using DevIO.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DevIO.Data.Mappings
{
    public class AmigoMapping : IEntityTypeConfiguration<Amigo>
    {
        public void Configure(EntityTypeBuilder<Amigo> builder)
        {
            builder.HasKey(amigo => amigo.Id);

            builder.Property(amigo => amigo.Nome)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(amigo => amigo.Telefone)
                .IsRequired()
                .HasColumnType("varchar(11)");

            builder.ToTable("Amigos");
        }
    }
}
