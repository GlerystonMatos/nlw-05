using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace RxPlantManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantController : ControllerBase
    {
        [HttpGet]
        [EnableQuery]
        public IQueryable<Plant> Get()
        {
            IList<Plant> plants = new List<Plant>();

            Plant plant = new Plant();
            plant.Id = 1;
            plant.Name = "Aningapara";
            plant.About = "É uma espécie tropical que tem crescimento rápido e fácil manuseio.";
            plant.WaterTips = "Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/1.svg";
            plant.Environments = new string[2];
            plant.Environments[0] = "living_room";
            plant.Environments[1] = "kitchen";
            plant.Frequency = new Frequency(2, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 2;
            plant.Name = "Zamioculca";
            plant.About = "Apesar de florescer na primavera, fica o ano todo bonita e verdinha.";
            plant.WaterTips = "Utilize vasos com furos e pedras no fundo para facilitar a drenagem. Regue 1 vez no dia.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/2.svg";
            plant.Environments = new string[2];
            plant.Environments[0] = "living_room";
            plant.Environments[1] = "bedroom";
            plant.Frequency = new Frequency(1, "day");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 3;
            plant.Name = "Peperomia";
            plant.About = "Adapta-se tanto ao sol e sombra, mas prefere ficar num cantinho fresco, sem sol direto.";
            plant.WaterTips = "Nos dias mais quentes borrife água nas folhas. Regue 3 vezes na semana.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/3.svg";
            plant.Environments = new string[1];
            plant.Environments[0] = "bedroom";
            plant.Frequency = new Frequency(3, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 4;
            plant.Name = "Imbé";
            plant.About = "De médio porte que se adapta a diversas regiões, além de ser bem fácil de cultivar. Conquista cada vez mais pessoas.";
            plant.WaterTips = "Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/4.svg";
            plant.Environments = new string[2];
            plant.Environments[0] = "bedroom";
            plant.Environments[1] = "living_room";
            plant.Frequency = new Frequency(2, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 5;
            plant.Name = "Espada São Jorge";
            plant.About = "O aroma reduz os níveis de ansiedade e seu cheiro ajudar na qualidade do sono e a produtividade durante o dia.";
            plant.WaterTips = "Regue o solo ao redor. Regue 1 vez no dia.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/5.svg";
            plant.Environments = new string[2];
            plant.Environments[0] = "bedroom";
            plant.Environments[1] = "living_room";
            plant.Frequency = new Frequency(0, "day");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 6;
            plant.Name = "Yucca";
            plant.About = "São indicadas pois são fáceis de manter e cuidar. Você colocar em pequenos vasos, ou até mesmo em xícaras.";
            plant.WaterTips = "Graças à reserva de água dessas verdinhas, é sempre melhor regar pouco. Regue 1 vez na semana.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/6.svg";
            plant.Environments = new string[2];
            plant.Environments[0] = "kitchen";
            plant.Environments[1] = "bedroom";
            plant.Frequency = new Frequency(1, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 7;
            plant.Name = "Frutíferas";
            plant.About = "Exigem algumas horinhas de sol por dia, por isso deixe próximo a janelas.";
            plant.WaterTips = "Regue sempre na terra e não as folhas. Regue 3 vezes na semana";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/7.svg";
            plant.Environments = new string[2];
            plant.Environments[0] = "kitchen";
            plant.Environments[1] = "living_room";
            plant.Frequency = new Frequency(3, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 8;
            plant.Name = "Orquídea";
            plant.About = "Traz sensação de tranquilidade e paz ao ambiente. Requer pouca manutenção e ótima para quem tem pouco espaço.";
            plant.WaterTips = "Regue moderadamente. Reque 4 vezes na semana.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/8.svg";
            plant.Environments = new string[1];
            plant.Environments[0] = "bathroom";
            plant.Frequency = new Frequency(4, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 9;
            plant.Name = "Violeta";
            plant.About = "Com flores delicadas. Elas são ótimas sugestões para decorar o banheiro.";
            plant.WaterTips = "Nada de molhar as flores e folhas. Regue o solo 2 vezes na semana.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/3.svg";
            plant.Environments = new string[1];
            plant.Environments[0] = "bathroom";
            plant.Frequency = new Frequency(2, "week");
            plants.Add(plant);

            plant = new Plant();
            plant.Id = 10;
            plant.Name = "Hortênsia";
            plant.About = "A hortênsia é uma planta rústica e se adapta a diferentes tipos de solos.";
            plant.WaterTips = "Mantenha a terra sempre húmida sem encharcar. Regue 1 vez no dia.";
            plant.Photo = "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/2.svg";
            plant.Environments = new string[1];
            plant.Environments[0] = "bathroom";
            plant.Frequency = new Frequency(1, "day");
            plants.Add(plant);

            return plants.AsQueryable();
        }
    }
}