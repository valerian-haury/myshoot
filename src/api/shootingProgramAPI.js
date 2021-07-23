
export function getAllShootingPrograms() {

    const defaultState = [
        {
            id: '1',
            title: "Programme d'exemple",
            shooter: 'John Doe',
            weaponId: 1,
            targetId: 1,
            date: '01/01/1970',
            color: '#30e79e',
            program: [
                {key: 1, score: 8, direction: 'B'},
                {key: 2, score: 10, direction: 'C'},
                {key: 3, score: 7, direction: 'BR'},
                {key: 4, score: 9, direction: 'R'},
                {key: 5, score: 9, direction: 'TR'},
            ]
        }
    ]

    const shootingPrograms = JSON.parse(localStorage.getItem("shootingPrograms") || JSON.stringify(defaultState));
    return shootingPrograms
}

export function createShootingProgram(shootingProgram) {
    const shootingPrograms = getAllShootingPrograms()
    shootingPrograms.push(shootingProgram)
    localStorage.setItem("shootingPrograms", JSON.stringify(shootingPrograms));
}

export function editShootingProgram(newShootingProgram) {
    const {id, title, shooter, weaponId, targetId, date, program} = newShootingProgram
    const shootingPrograms = getAllShootingPrograms()
    const existingProgram = shootingPrograms.find(p => p.id === id)
    if (existingProgram) {
        existingProgram.title = title
        existingProgram.shooter = shooter
        existingProgram.weaponId = weaponId
        existingProgram.targetId = targetId
        existingProgram.date = date
        existingProgram.program = program
    }
    localStorage.setItem("shootingPrograms", JSON.stringify(shootingPrograms));
}

export function deleteShootingProgram(shootingProgram) {
    const {id} = shootingProgram
    const shootingPrograms = getAllShootingPrograms()
    const existingProgram = shootingPrograms.find(p => p.id === id)
    if (existingProgram) {
        const index = shootingPrograms.indexOf(existingProgram)
        shootingPrograms.splice(index, 1)
    }
    localStorage.setItem("shootingPrograms", JSON.stringify(shootingPrograms));
}