using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;

namespace RxPlantManager
{
    public class EdmModelConfig
    {
        public static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder odataBuilder = new ODataConventionModelBuilder();

            odataBuilder.EntitySet<Plant>("Plant");
            odataBuilder.EntitySet<Frequency>("Frequency");
            odataBuilder.EntitySet<PlantEnvironment>("PlantEnvironment");
            odataBuilder.EntitySet<PlantWaterFrequencie>("PlantWaterFrequencie");

            return odataBuilder.GetEdmModel();
        }
    }
}