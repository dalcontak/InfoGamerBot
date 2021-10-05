
export const ValidGameNames: string[] = [
    "sc2", "lol", "dota2"
]

export const validateNameGame = (nameGame: string) => {

    return ValidGameNames.includes(nameGame.toLowerCase());
}