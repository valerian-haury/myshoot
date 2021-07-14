import React from "react";
import {Table, InputNumber} from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import './programTable.css'

import T from "../../images/arrows/top.svg"
import R from "../../images/arrows/right.svg"
import B from "../../images/arrows/bottom.svg"
import L from "../../images/arrows/left.svg"
import C from "../../images/arrows/center.svg"
import TL from "../../images/arrows/top-left.svg"
import TR from "../../images/arrows/top-right.svg"
import BR from "../../images/arrows/bottom-right.svg"
import BL from "../../images/arrows/bottom-left.svg"


const directionIcons = [
    {name: 'T', image: T},
    {name: 'R', image: R},
    {name: 'B', image: B},
    {name: 'L', image: L},
    {name: 'C', image: C},
    {name: 'TL', image: TL},
    {name: 'TR', image: TR},
    {name: 'BR', image: BR},
    {name: 'BL', image: BL},
]


export const ProgramTable = ({lenght, program, onChange}) => {

    const formatedProgram = program.slice(0, lenght)

    const onScoreInputChanged = (key, newScore) => {

        const newProgram = program.slice() // make a copy of the props
        const newShot = newProgram.find(shot => shot.key === key) // get the modified shot
        newShot.score = newScore // mutate the value by reference

        onChange(newProgram) // bubble the event to the parent
    }

    const onDirectionClicked = (key, e) => {
        const newDirection =  e.target.name
        const newProgram = program.slice() // make a copy of the props
        const newShot = newProgram.find(shot => shot.key === key) // get the modified shot
        newShot.direction = newDirection // mutate the value by reference

        onChange(newProgram) // bubble the event to the parent
    }


    const programColumn = [
        {title: '#', dataIndex: 'key', key: 'key', render: (key) => (<b>{key}</b>)},
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (score, shot) => (

                <InputNumber min={0} max={10} defaultValue={score} style={{ maxWidth: 60}}
                             onChange={(newScore) => onScoreInputChanged(shot.key, newScore)}/>
            )
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction, shot) => (
                <DirectionList activeDirection={direction} shot={shot}/>
            )
        },
        {
            title: '',
            dataIndex: 'unselected',
            key: 'unselected',
            render: (e, shot) => (
                <CloseCircleFilled
                    style={{
                        color: "#e55454",
                        fontSize: "15px",
                        display: ((shot.direction === '') || (shot.score === null)) ? "" : "none"}}
                />
            )
        }
    ]

    const DirectionList = ({activeDirection, shot}) => {
        const renderDirectionIcon = directionIcons.map(icon => (
            <img
                className={(icon.name === activeDirection ? "direction-icon direction-selected" : "direction-icon")}
                key={icon.name} name={icon.name} src={icon.image}
                style={{maxWidth: "50px", padding: "0 10px"}}
                alt={"directional arrow"}
                onClick={(e) => onDirectionClicked(shot.key, e)}
            />
        ))

        return (
            <>
                {renderDirectionIcon}
            </>
        )
    }

    return (
        <Table pagination={false} columns={programColumn} dataSource={formatedProgram}/>
    )
}