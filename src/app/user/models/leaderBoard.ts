    export interface Leaderboard {
        leaderboard: Participant[];
        topPerformers: Participant[];
        totalParticipants: number;
    }
    
    export interface Participant {
        _id: string;
        name: string;
        username: string;
        email: string;
        totalBonusPoints: number;
    }
    