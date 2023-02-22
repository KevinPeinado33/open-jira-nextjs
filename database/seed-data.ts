interface SeedEntry {
    description: string
    status:      string
    createdAt:    number
}

interface SeedData {
    entries: SeedEntry[]
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'pending: Describeme esta p',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'in-progress: Describeme esta p',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'finished: Describeme esta p',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}
