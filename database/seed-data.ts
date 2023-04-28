
interface  SeedData {
    entries:SeedEntry[];
}

interface SeedEntry {
    description: string,
        status: string,
        createat: number
}

export const seedData:SeedData = {
    entries: [{
        description: 'lorem',
        status: 'pending',
        createat: Date.now()
    },
    {
        description: 'lorem 2',
        status: 'in-progress',
        createat: Date.now() - 1000000
    },
    {
        description: 'lorem 3',
        status: 'finished',
        createat: Date.now() - 10000
    }]
}