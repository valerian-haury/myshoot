import React from "react"
import {Card, Spin} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {selectAllPrograms, shootingProgramDeleted} from "./shootingProgramsSlice";

export const ShootingProgramsList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    let isLoaded = true

    let programs = []
    programs = useSelector(selectAllPrograms)

    const deleteProgramHandle = (e) => {
        const programId = e.currentTarget.id
        dispatch(shootingProgramDeleted({id: programId}))
        history.push("/")
    }

    const CustomCard = ({title, description, color, programId}) => {
        const {Meta} = Card;
        return (
            <Link to={"/program/" + programId}>
                <Card
                    hoverable
                    id={programId}
                    style={{width: 240, margin: "0 12.5px 25px 12.5px"}}
                    cover={
                        <div style={{height: "100px", backgroundColor: color}}>
                            <DeleteOutlined id={programId}
                                            style={{
                                                color: "white",
                                                fontSize: "20px",
                                                float: "right",
                                                margin: "10px",
                                            }}
                                            onClick={deleteProgramHandle}
                            />
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

    if (isLoaded) {
        return (<>{renderPrograms}</>)
    } else {
        return (
            <div className="spinner-container" style={{alignSelf: "center", textAlign: "center", width: "100%"}}>
                <Spin size={"large"}/>
            </div>
        )
    }

}