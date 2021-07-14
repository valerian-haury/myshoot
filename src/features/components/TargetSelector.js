import React from "react";
import './radioSelector.css';

import {CheckCircleFilled} from "@ant-design/icons"

import A10 from '../../images/A10.svg'
import A5 from '../../images/A5.svg'
import B4 from '../../images/B4.svg'

const targets = [
    {
        id: 0,
        title: "A5",
        image: A5
    },
    {
        id: 1,
        title: "A10",
        image: A10,
    },
    {
        id: 2,
        title: "B4",
        image: B4,
    },
]

export const TargetSelector = ({targetId, onClick}) => {

    const renderTargetSelector = targets.map(target => {
        const isSelected = (target.id === targetId)
        return (
            <article id={"target-" + target.id} key={target.id}
                     className={ isSelected ? "radio-article radio-selected" : "radio-article"}
                     onClick={onClick}>
                <CheckCircleFilled className={"check-icon"} style={{ display: isSelected ? "" : "none"}}/>
                <img
                    className={"target-img"}
                    src={target.image}
                    alt={"target-image-" + target.title}
                />
                <span className={"radio-title"}>{target.title}</span>
            </article>
        )
    })

    return (
        <>
            <span className={"label"}>Cible:</span>
            <div className="radio-container">
                {renderTargetSelector}
            </div>
        </>
    )
}