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

        const { Times, RepeatEvery } = plant.Frequency;

        if (RepeatEvery === 'week') {
            const interval = Math.trunc(7 / Times);
            nextTime.setDate(now.getDate() + interval);
        } else {
            if (Times > 1)
                nextTime.setDate(nextTime.getDate() + 1);
        }

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        );

    } catch (error) {
        throw new Error(error);
    }
}