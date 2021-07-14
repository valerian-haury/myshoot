import {createSlice} from "@reduxjs/toolkit"
import {nanoid} from 'nanoid'

const initialState = {
    programs: [
        {
            id: '1',
            title: 'Tir obligatoire 2021',
            shooter: 'Valérian Haury',
            weapon: 1,
            target: 1,
            date: new Date(),
            color: '#ea6969',
            program: [
                {key: 1, score: 8, direction: 'B'},
                {key: 2, score: 10, direction: 'C'},
                {key: 3, score: 7, direction: 'BR'},
                {key: 4, score: 9, direction: 'R'},
                {key: 5, score: 9, direction: 'TR'},
            ]
        },
        {
            id: '2',
            title: 'Tir obligatoire 2020',
            shooter: 'Valérian Haury',
            weaponId: 1,
            targetId: 1,
            date: new Date(),
            color: '#b9d948',
            program: [
                {key: 1,score: 8, direction: 'B'},
                {key: 2, score: 10, direction: 'C'},
                {key: 3, score: 7, direction: 'BR'},
                {key: 4, score: 9, direction: 'R'},
                {key: 5, score: 9, direction: 'TR'},
            ]
        }
    ],
    status: 'idle',
    error: null
}

const shootingProgramsSlice = createSlice({
    name: 'ShootingPrograms',
    initialState,
    reducers: {
        shootingProgramAdded: {
            reducer(state, action) {
                state.shootingPrograms.programs.push(action.payload)
            },
            prepare(title, shooter, weapon,target, date, program) {
                var randomColor = require('randomcolor')
                return {
                    id: nanoid(),
                    title: title,
                    shooter: shooter,
                    weapon: weapon,
                    target: target,
                    date: date,
                    color: randomColor(),
                    program: program
                }
            }
        }
    }
})

export const { shootingProgramAdded } = shootingProgramsSlice.actions

export default shootingProgramsSlice.reducer

export const selectAllPrograms = state => state.shootingPrograms.programs

export const selectProgramById = (state, programId) =>
    state.shootingPrograms.programs.find(program => program.id === programId)