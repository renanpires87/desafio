using DevIO.Business.Models.Validations.Documentos;
using FluentValidation;

namespace DevIO.Business.Models.Validations
{
    public class AmigoValidation : AbstractValidator<Amigo>
    {
        public AmigoValidation()
        {
            RuleFor(amigo => amigo.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .Length(2, 100)
                .WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(amigo => amigo.Telefone.Length).Equal(TelefoneValidacao.Tamanho)
                    .WithMessage("O campo Telefone precisa ter {ComparisonValue} caracteres e foi fornecido {PropertyValue}.");

            RuleFor(amigo => TelefoneValidacao.Validar(amigo.Telefone)).Equal(true)
                .WithMessage("O telefone fornecido é inválido.");
        }
    }
}
