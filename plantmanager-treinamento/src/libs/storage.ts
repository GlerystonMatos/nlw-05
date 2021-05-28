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
    Hour: string;
    DateTimeNotification: Date;
}

export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        const nextTime = new Date(plant.DateTimeNotification);
        const now = new Date();

    } catch (error) {
        throw new Error(error);
    }
}