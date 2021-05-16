using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace RxPlantManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantEnvironmentController : Controller
    {
        [HttpGet]
        [EnableQuery]
        public IQueryable<PlantEnvironment> Get()
        {
            IList<PlantEnvironment> plantsEnvironments = new List<PlantEnvironment>();

            PlantEnvironment plantEnvironment = new PlantEnvironment();
            plantEnvironment.Key = "living_room";
            plantEnvironment.Title = "Sala";
            plantsEnvironments.Add(plantEnvironment);

            plantEnvironment = new PlantEnvironment();
            plantEnvironment.Key = "bedroom";
            plantEnvironment.Title = "Quarto";
            plantsEnvironments.Add(plantEnvironment);

            plantEnvironment = new PlantEnvironment();
            plantEnvironment.Key = "kitchen";
            plantEnvironment.Title = "Cozinha";
            plantsEnvironments.Add(plantEnvironment);

            plantEnvironment = new PlantEnvironment();
            plantEnvironment.Key = "bathroom";
            plantEnvironment.Title = "Banheiro";
            plantsEnvironments.Add(plantEnvironment);

            return plantsEnvironments.AsQueryable();
        }
    }
}