import React from "react"
import {Layout, Menu, Card} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

import {useSelector} from "react-redux";

import {selectAllPrograms} from "./shootingProgramsSlice";

export const ShootingProgramsList = () => {

    const programs = useSelector(selectAllPrograms)

    const deleteProgramHandle = (e) => {
        //const programId = e.currentTarget.id
        //api call to delete program
    }

    const CustomCard = ({title, description, color, programId}) => {
        const {Meta} = Card;
        return (
            <Link to={"/program/" + programId}>
                <Card
                    hoverable
                    style={{width: 240, margin: "0 12.5px 25px 12.5px"}}
                    cover={
                        <div style={{height: "100px", backgroundColor: color}}>
                            <DeleteOutlined id={programId}
                                            style={{color: "white", fontSize: "20px", float: "right", margin: "10px"}}
                                            onClick={deleteProgramHandle}/>
                        </div>
                    }
                >
                    <Meta title={title} description={description}/>
                </Card>
            </Link>
        )
    }

    const renderPrograms = programs.map(program => (
        <CustomCard
            key={program.id}
            title={program.title}
            description={program.shooter + " - " + program.date}
            color={program.color}
            programId={program.id}
        />
    ))

    return (
        <>
            {renderPrograms}
        </>
    )
}