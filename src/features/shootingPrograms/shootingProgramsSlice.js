import {createSlice} from "@reduxjs/toolkit"
import {nanoid} from 'nanoid'
import {
    createShootingProgram,
    deleteShootingProgram,
    editShootingProgram,
    getAllShootingPrograms
} from '../../api/shootingProgramAPI'

const oldSTate = [
    {
        id: '1',
        title: 'Tir obligatoire 2021',
        shooter: 'Valérian Haury',
        weaponId: 1,
        targetId: 1,
        date: '17/07/2021',
        color: '#aa50d7',
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
        date: '04/06/2020',
        color: '#3dd694',
        program: [
            {key: 1, score: 8, direction: 'B'},
            {key: 2, score: 10, direction: 'C'},
            {key: 3, score: 7, direction: 'BR'},
            {key: 4, score: 9, direction: 'R'},
            {key: 5, score: 9, direction: 'TR'},
        ]
    }
]


const initialState = getAllShootingPrograms()

const shootingProgramsSlice = createSlice({
    name: 'shootingPrograms',
    initialState,
    reducers: {
        shootingProgramAdded: {
            reducer(state, action) {
                state.push(action.payload)
                createShootingProgram(action.payload)
            },
            prepare(title, shooter, weaponId, targetId, date, program) {
                var randomColor = require('randomcolor')
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        shooter: shooter,
                        weaponId: weaponId,
                        targetId: targetId,
                        date: date,
                        color: randomColor(),
                        program: program
                    }
                }
            }
        },

        shootingProgramUpdated(state, action) {
            const {id, title, shooter, weaponId, targetId, date, program} = action.payload
            const existingProgram = state.find(p => p.id === id)
            if (existingProgram) {
                existingProgram.title = title
                existingProgram.shooter = shooter
                existingProgram.weaponId = weaponId
                existingProgram.targetId = targetId
                existingProgram.date = date
                existingProgram.program = program

                editShootingProgram(action.payload)
            }
        },

        shootingProgramDeleted(state, action) {
            const {id} = action.payload
            const existingProgram = state.find(p => p.id === id)
            if (existingProgram) {
                const index = state.indexOf(existingProgram)
                state.splice(index, 1)

                deleteShootingProgram(action.payload)
            }
        }
    }
})

export const {shootingProgramAdded, shootingProgramUpdated, shootingProgramDeleted} = shootingProgramsSlice.actions

export default shootingProgramsSlice.reducer

export const selectAllPrograms = state => state.shootingPrograms

export const selectProgramById = (state, programId) =>
    state.shootingPrograms.find(program => program.id === programId)