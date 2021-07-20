import {createSlice} from "@reduxjs/toolkit"

import A10 from '../../images/A10.svg'
import A5 from '../../images/A5.svg'
import B4 from '../../images/B4.svg'

const initialState = [
    {
        id: 0,
        title: "A5",
        image: A5,
        maxScore: 5
    },
    {
        id: 1,
        title: "A10",
        image: A10,
        maxScore: 10
    },
    {
        id: 2,
        title: "B4",
        image: B4,
        maxScore: 4
    },
]

const TargetsSlice = createSlice({
    name: 'targets',
    initialState,
    reducers: {}
})

export default TargetsSlice.reducer

export const selectAllTargets = state => state.targets