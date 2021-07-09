import React from "react"
import {Layout, Menu, Card} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

import {useSelector} from "react-redux";

import {selectAllPrograms} from "./shootingProgramsSlice";

export const ShootingProgramsList = () => {

    const {Header, Content, Footer} = Layout;

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
                            <DeleteOutlined id={programId} style={{color: "white", fontSize: "20px", float: "right", margin: "10px"}} onClick={deleteProgramHandle}/>
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
            description={program.shooter + " - " + program.date.toLocaleDateString()}
            color={program.color}
            programId={program.id}
        />
    ))

    return (
        <Layout>
            <Header style={{zIndex: 1, width: '100%', background: "white"}}>
                <div className="logo custom-logo">MY SHOOT</div>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to={'/'}>Tirs</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={'/addShootingProgram'}>Nouveau Tir</Link></Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout"
                     style={{margin: '0px 50px 0 50px', marginTop: "50px", backgroundColor: "white"}}>
                <div className="site-layout-background"
                     style={{padding: '24px 12.5px', minHeight: 380, display: "flex", flexWrap: 'wrap'}}>
                    {renderPrograms}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>HEG IG Bachelor degree ©2021 - by V.HAURY</Footer>
        </Layout>

    )
}