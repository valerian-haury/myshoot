import React from "react";
import './radioSelector.css';

import {CheckCircleFilled} from "@ant-design/icons"

import FASS90 from "../../images/FASS_90.svg"
import FASS57 from "../../images/FASS_57.svg"
import Mousqueton from "../../images/Mousqueton.svg"
import Autre from "../../images/Autre.svg"


const weapons = [
    {
        id: 0,
        title: "FASS 90",
        image: FASS90,
    },
    {
        id: 1,
        title: "FASS 57",
        image: FASS57
    },
    {
        id: 2,
        title: "Mousqueton",
        image: Mousqueton,
    },
    {
        id: 3,
        title: "Autre",
        image: Autre,
    },
]

export const WeaponsSelector = ({weaponsId, onClick}) => {

    const renderWeaponSelector = weapons.map(weapon => {
        const isSelected = (weapon.id === weaponsId)
        return (
            <article id={"weapon-" + weapon.id} key={weapon.id}
                     className={isSelected ? "radio-article radio-selected" : "radio-article"}
                     onClick={onClick}>
                <CheckCircleFilled className={"check-icon"} style={{display: isSelected ? "" : "none"}}/>
                <img
                    className={"weapon-img"}
                    src={weapon.image}
                    alt={"weapon-image-" + weapon.title}
                />
                <span className={"radio-title"}>{weapon.title}</span>
            </article>
        )
    })

    return (
        <>
            <span className={"label"}>Arme:</span>
            <div className="radio-container">
                {renderWeaponSelector}
            </div>
        </>
    )
}