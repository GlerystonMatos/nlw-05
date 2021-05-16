using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace RxPlantManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantsWaterFrequenciesController : Controller
    {
        [HttpGet]
        [EnableQuery]
        public IQueryable<PlantWaterFrequencie> Get()
        {
            IList<PlantWaterFrequencie> plantWaterFrequencies = new List<PlantWaterFrequencie>();

            PlantWaterFrequencie plantWaterFrequencie = new PlantWaterFrequencie();
            plantWaterFrequencie.Key = "day";
            plantWaterFrequencie.Title = "Todos os dias";
            plantWaterFrequencies.Add(plantWaterFrequencie);

            plantWaterFrequencie = new PlantWaterFrequencie();
            plantWaterFrequencie.Key = "week";
            plantWaterFrequencie.Title = "A cada semana";
            plantWaterFrequencies.Add(plantWaterFrequencie);

            return plantWaterFrequencies.AsQueryable();
        }
    }
}