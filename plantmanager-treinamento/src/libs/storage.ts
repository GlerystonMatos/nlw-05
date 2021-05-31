import { format } from 'date-fns';
import * as Notification from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
        notificationId: string;
    }
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

        const notificationId = await Notification.scheduleNotificationAsync({
            content: {
                title: 'Heeey, 🌱',
                body: `Está na hora de cuidar da sua ${plant.Name}`,
                sound: true,
                priority: Notification.AndroidNotificationPriority.HIGH,
                data: {
                    plant,
                }
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true,
            }
        });

        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlants = {
            [plant.Id]: {
                data: plant,
                notificationId: notificationId,
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlants,
                ...oldPlants,
            }));

    } catch (error) {
        throw new Error(error);
    }
}

export async function loadPlant(): Promise<PlantProps[]> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    Hour: format(new Date(plants[plant].data.DateTimeNotification), 'HH:mm'),
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.DateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.DateTimeNotification).getTime() / 1000)
                )
            );

        return plantsSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function removePlant(id: string): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        await Notification.cancelScheduledNotificationAsync(plants[id].notificationId);

        delete plants[id];

        await AsyncStorage.setItem(
            '@plantmanager:plants',
            JSON.stringify(plants),
        );
    } catch (error) {
        throw new Error(error);
    }
}