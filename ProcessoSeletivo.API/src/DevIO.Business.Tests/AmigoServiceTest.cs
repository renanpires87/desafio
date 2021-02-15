using DevIO.Business.Models;
using DevIO.Business.Services;
using Moq.AutoMock;
using System.Threading.Tasks;
using Xunit;

namespace DevIO.Business.Tests
{
    public class AmigoServiceTest
    {
        private readonly AutoMocker _mocker;
        private readonly AmigoService _amigoService;

        public AmigoServiceTest()
        {
            _mocker = new AutoMocker();
            _amigoService = _mocker.CreateInstance<AmigoService>();
        }

        [Fact(DisplayName = "Adicionar amigo telefone invalido")]
        public async Task AdicionarAmigo_DadosInvalidos()
        {
            // Arrange
            var amigo = new Amigo();
            amigo.AlterarNome("Renan");
            amigo.AlterarTelefone("99999999999");

            // Act
            var result = await _amigoService.Adicionar(amigo);

            // Assert
            Assert.False(result);
        }

        [Fact(DisplayName = "Adicionar amigo dados validos")]
        public async Task AdicionarAmigo_DadosOk()
        {
            // Arrange
            var amigo = new Amigo();
            amigo.AlterarNome("Renan");
            amigo.AlterarTelefone("12345678911");

            // Act
            var result = await _amigoService.Adicionar(amigo);

            // Assert
            Assert.True(result);
        }
    }
}