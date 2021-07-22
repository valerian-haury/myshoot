import React from 'react';
import { useSelector } from "react-redux";
import Canvas from "./Canvas";
import "./estimator.css"

import { selectAllTargets } from "../Targets/TargetsSlice"

export const Estimator = ({targetId, program, canGenerate}) => {

    const targets = useSelector(selectAllTargets)
    const actualTarget = targets.find(target => target.id === targetId)

    return (
        <Canvas canvasSize={350} maxScore={actualTarget.maxScore} target={actualTarget.image} program={program} canGenerate={canGenerate}/>
    )
}