import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {ShootingProgramForm} from "./ShootingProgramForm";
import {shootingProgramAdded} from "./shootingProgramsSlice";

export const AddShootingProgram_v2 = () => {

    const [shootingProgram, setshootingProgram] = useState(
        {
            title: '',
            shooter: '',
            weaponId: 0,
            targetId: 0,
            maxScore: 5,
            date: new Date(),
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

    const onFinishFailed = () => {
        console.log("hop error")
    }


    return (
        <>
            <ShootingProgramForm data={shootingProgram} onSave={addNewShootingProgram}/>
        </>
    )
}