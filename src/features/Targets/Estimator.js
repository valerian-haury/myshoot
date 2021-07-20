import React, {useState} from 'react';
import { useSelector } from "react-redux";
import Canvas from "./Canvas";
import "./estimator.css"

import { selectAllTargets } from "../Targets/TargetsSlice"

import A10 from '../../images/A10.svg'
import A5 from '../../images/A5.svg'
import B4 from '../../images/B4.svg'

const DIRECTION = ['T', 'R', 'B', 'L', 'C', 'TL', 'TR', 'BR', 'BL'];
const MAX_SCORE = 10;

export const Estimator = ({targetId, program, canGenerate}) => {

    const targets = useSelector(selectAllTargets)
    const actualTarget = targets.find(target => target.id === targetId)



    return (
        <Canvas canvasSize={300} maxScore={actualTarget.maxScore} target={actualTarget.image} program={program} canGenerate={canGenerate}/>
    )
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}