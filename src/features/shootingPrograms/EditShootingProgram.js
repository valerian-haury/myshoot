import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {selectProgramById, shootingProgramUpdated} from "./shootingProgramsSlice";
import {selectAllTargets} from "../Targets/TargetsSlice";
import {ShootingProgramForm} from "./ShootingProgramForm";

export const EditShootingProgram = ({match}) => {

    const dispatch = useDispatch()
    const history = useHistory()

    // get the url param
    const {programId} = match.params

    // Data querry
    const programData = Object.assign({}, useSelector(state => selectProgramById(state, programId)))
    const targets = useSelector(selectAllTargets)

    //set a default inital state
    let initialShootingProgram = {
        title: '',
        shooter: '',
        weaponId: 0,
        targetId: 0,
        maxScore: 5,
        date: new Date(),
        program: [{key: 1, score: null, direction: ''}],
    }

    // if the shooting program truly exist
    if (Object.entries(programData).length === 0) {
        history.push('/')
    } else {
        const initialProgram = []
        programData.program.forEach((shot, i) => initialProgram.push(clone(shot)));
        const [day, month, year] = programData.date.split('/')
        const formatedDate = new Date(year, month - 1, day)

        initialShootingProgram = {
            title: programData.title,
            shooter: programData.shooter,
            weaponId: programData.weaponId,
            targetId: programData.targetId,
            maxScore: targets.find(target => target.id === programData.targetId).maxScore,
            date: formatedDate,
            program: initialProgram
        }
    }

    const [shootingProgram, setshootingProgram] = useState(initialShootingProgram)


    const editShootingProgram = (newShootingProgram) => {
        setshootingProgram(newShootingProgram)
        dispatch(
            shootingProgramUpdated(
                {
                    id: programId,
                    title: newShootingProgram.title,
                    shooter: newShootingProgram.shooter,
                    weaponId: newShootingProgram.weaponId,
                    targetId: newShootingProgram.targetId,
                    date: newShootingProgram.date.toLocaleDateString(),
                    program: newShootingProgram.program
                }
            )
        )
        history.push(`/`)
    }

    return (
        <>
            <ShootingProgramForm data={shootingProgram} onSave={editShootingProgram}/>
        </>
    )
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}