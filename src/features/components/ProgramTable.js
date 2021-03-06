import React from "react";
import {Table, InputNumber, Tooltip} from "antd";
import {CloseCircleFilled, ExclamationCircleFilled} from "@ant-design/icons";
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


export const ProgramTable = ({lenght, program, maxScore, onChange}) => {

    const formatedProgram = program.slice(0, lenght)

    const onScoreInputChanged = (key, newScore) => {

        const newProgram = program.slice() // make a copy of the props

        const newShot = newProgram.find(shot => shot.key === key) // get the modified shot
        newShot.score = newScore // mutate the value by reference

        onChange(newProgram) // bubble the event to the parent
    }

    const onDirectionClicked = (key, e) => {
        const newDirection = e.target.name
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
                ScoreInput({key: "scoreInput-" + shot.key, score: score, shot: shot})
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
            render: (e, shot) => {
                const isScoreNull = (shot.score === null)
                const isDirectionNull = (shot.direction === '')
                const isHigherThanMaxScore = (shot.score > maxScore)
                let errorMessage = ""

                if (isScoreNull && isDirectionNull)
                    errorMessage = "Score et direction non d??finis"
                else if (isScoreNull)
                    errorMessage = "Score non d??finis"
                else if (isHigherThanMaxScore)
                    errorMessage = "Le score est trop ??lev?? par rapport ?? la cible choisie"
                else if (isDirectionNull)
                    errorMessage = "Direction non d??finie"

                return (
                    <Tooltip color={"#e55454"} title={errorMessage} placement="right"
                             trigger={(isScoreNull || isDirectionNull || isHigherThanMaxScore) ? "hover" : "focus"}>
                        <ExclamationCircleFilled
                            style={{
                                fontSize: "15px",
                                color: (isScoreNull || isDirectionNull || isHigherThanMaxScore) ? "#e55454" : "transparent"
                            }}
                        />
                    </Tooltip>
                )
            }
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

    const ScoreInput = ({score, shot}) => {
        return (
            <InputNumber key={"inputNumber-" + shot.key} min={0} max={maxScore} style={{maxWidth: 100}}
                         defaultValue={score}
                         onChange={(newScore) => onScoreInputChanged(shot.key, newScore)}/>

        )
    }


    return (
        <Table columns={programColumn} dataSource={formatedProgram} pagination={false}/>
    )
}