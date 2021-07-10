import {createSlice} from "@reduxjs/toolkit"
import {nanoid} from 'nanoid'

const initialState = {
    programs: [
        {
            id: '1',
            title: 'Tir obligatoire 2021',
            shooter: 'Valérian Haury',
            weapon: 1,
            date: new Date(),
            color: '#ea6969',
            program: [
                {score: 8, direction: 'B'},
                {score: 10, direction: 'C'},
                {score: 7, direction: 'BR'},
                {score: 9, direction: 'R'},
                {score: 9, direction: 'TR'},
            ]
        },
        {
            id: '2',
            title: 'Tir obligatoire 2020',
            shooter: 'Valérian Haury',
            weapon: 1,
            date: new Date(),
            color: '#b9d948',
            program: [
                {score: 8, direction: 'B'},
                {score: 10, direction: 'C'},
                {score: 7, direction: 'BR'},
                {score: 9, direction: 'R'},
                {score: 9, direction: 'TR'},
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
            prepare(title, shooter, weapon, date, program) {
                var randomColor = require('randomcolor')
                return {
                    id: nanoid(),
                    title: title,
                    shooter: shooter,
                    weapon: weapon,
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