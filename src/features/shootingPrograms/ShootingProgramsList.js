import React from "react"

import {useSelector} from "react-redux";

import {selectAllPrograms} from "./shootingProgramsSlice";

export const ShootingProgramsList = () => {

    const programs = useSelector(selectAllPrograms)

    const renderPrograms = programs.map(program => (
        <article key={program.id}>
            <h3>{program.title}</h3>
        </article>
    ))

    return (
        <div>
            {renderPrograms}
        </div>
    )
}