import React from "react";
import '../components/radioSelector.css';
import { useSelector } from "react-redux";
import {selectAllTargets} from "../Targets/TargetsSlice";

import {CheckCircleFilled} from "@ant-design/icons"




export const TargetSelector = ({targetId, onClick}) => {

    const targets = useSelector(selectAllTargets)

    const renderTargetSelector = targets.map(target => {
        const isSelected = (target.id === targetId)
        return (
            <article id={"target-" + target.id + "_" + target.maxScore} key={target.id}
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