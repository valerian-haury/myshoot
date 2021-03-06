import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {ShootingProgramForm} from "./ShootingProgramForm";
import {shootingProgramAdded} from "./shootingProgramsSlice";

export const AddShootingProgram = () => {

    const [shootingProgram, setshootingProgram] = useState(
        {
            title: '',
            shooter: '',
            weaponId: 0,
            targetId: 0,
            maxScore: 5,
            date: '',
            program: [{key: 1, score: null, direction: ''}],
        },
    )


    const dispatch = useDispatch()
    const history = useHistory()

    const addNewShootingProgram = (newShootingProgram) => {
        setshootingProgram(newShootingProgram)
        dispatch(
            shootingProgramAdded(
                newShootingProgram.title,
                newShootingProgram.shooter,
                newShootingProgram.weaponId,
                newShootingProgram.targetId,
                newShootingProgram.date.toLocaleDateString(),
                newShootingProgram.program
            )
        )
        history.push("/")
    }

    return (
        <>
            <ShootingProgramForm data={shootingProgram} onSave={addNewShootingProgram}/>
        </>
    )
}