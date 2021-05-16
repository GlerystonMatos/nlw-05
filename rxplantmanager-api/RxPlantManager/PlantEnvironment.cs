using System;

namespace RxPlantManager
{
    public class PlantEnvironment
    {
        public PlantEnvironment()
            => Id = Guid.NewGuid();

        public Guid Id { get; set; }

        public string Key { get; set; }

        public string Title { get; set; }
    }
}
