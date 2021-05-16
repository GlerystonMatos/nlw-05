using System;

namespace RxPlantManager
{
    public class PlantWaterFrequencie
    {
        public PlantWaterFrequencie()
            => Id = Guid.NewGuid();

        public Guid Id { get; set; }

        public string Key { get; set; }

        public string Title { get; set; }
    }
}
