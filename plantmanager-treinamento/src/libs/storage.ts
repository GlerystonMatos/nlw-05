export interface PlantProps {
    Id: string;
    Name: string;
    About: string;
    WaterTips: string;
    Photo: string;
    Environments: [string];
    Frequency: {
        Times: number;
        RepeatEvery: string;
    };
}