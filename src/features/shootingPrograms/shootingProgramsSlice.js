import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    programs: [
        {
            id: '1',
            title:'Tir obligatoire 2021',
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
            title:'Tir obligatoire 2020',
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
    reducers: {}
})

export default shootingProgramsSlice.reducer

export const selectAllPrograms = state => state.shootingPrograms.programs