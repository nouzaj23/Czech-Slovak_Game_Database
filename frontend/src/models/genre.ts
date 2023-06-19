export interface Genre {
    id: string;
    name: string | GenreType;
    description: string;
    games: string[]; // Game IDs
}

export enum GenreType {
    ACTION = "Action",
    ADVENTURE = "Adventure",
    RPG = "RPG",
    STRATEGY = "Strategy",
    SPORTS = "Sports",
    PUZZLE = "Puzzle",
    SHOOTER = "Shooter",
    FIGHTING = "Fighting",
    HORROR = "Horror",
    OPEN_WORLD = "Open World",
    SANDBOX = "Sandbox",
    MMO = "MMO",
    MMORPG = "MMORPG",
    MOBA = "MOBA",
    TOWER_DEFENSE = "Tower Defense",
    CARD = "Card",
    BOARD = "Board",
    CASUAL = "Casual",
    RACING = "Racing",
    VIRTUAL_REALITY = "Virtual Reality",
    EDUCATIONAL = "Educational",
    MUSIC = "Music",
    TRIVIA = "Trivia",
    BATTLE_ROYALE = "Battle Royale",
    STEALTH = "Stealth",
    TACTICAL = "Tactical",
    TURN_BASED = "Turn Based",
    OTHER = "Other"
}