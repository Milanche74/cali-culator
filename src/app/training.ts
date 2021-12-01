export interface Training {
    id: number;
    excercise: string;
    restTime: string;
    reps: number;
    sets: number;
    volume: number;
}

export const DISCIPLINES = [
    [
        {id: 1, name: 'Knee Push-ups', aux: true},
        {id: 2, name: 'Push-ups'},
        {id: 3, name: 'Dips'},
        {id: 4, name: 'Archer Push-ups', aux: true},
        {id: 5, name: 'OneArm Push-ups'},
        {id: 6, name: 'Inverted Rows', aux: true},
        {id: 7, name: 'Pull-ups'},
        {id: 8, name: 'Archer Pull-ups', aux: true},
        {id: 9, name: 'Muscle-ups'},
        {id: 10, name: 'Squats'},
        {id: 11, name: 'Platform Squats', aux: true},
        {id: 12, name: 'Pistol Squats'}
    ],
    [
        {id: 1, name:'Front Lever'},
        {id: 2, name:'Planche'},
        {id: 3, name:'Handstand'},
        {id: 3, name:'Human Flag'}
    ]
] 