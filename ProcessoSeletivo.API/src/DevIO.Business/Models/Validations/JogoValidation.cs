using FluentValidation;
using System;

namespace DevIO.Business.Models.Validations
{
    public class JogoValidation : AbstractValidator<Jogo>
    {
        public JogoValidation()
        {
            RuleFor(jogo => jogo.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .Length(2, 100)
                .WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");
        }
    }
}
