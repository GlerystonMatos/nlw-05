namespace RxPlantManager
{
    public class Plant
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string About { get; set; }

        public string WaterTips { get; set; }

        public string Photo { get; set; }

        public string[] Environments { get; set; }

        public Frequency Frequency { get; set; }
    }
}