using System;

namespace RxPlantManager
{
    public class Frequency
    {
        public Frequency(int times, string repeatEvery)
        {
            Id = Guid.NewGuid();
            Times = times;
            RepeatEvery = repeatEvery;
        }

        public Guid Id { get; set; }

        public int Times { get; set; }

        public string RepeatEvery { get; set; }
    }
}