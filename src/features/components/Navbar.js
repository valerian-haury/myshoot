import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export const NavBar = () => {

    const {Header} = Layout;

    return (
        <Header style={{zIndex: 1, width: '100%', background: "white"}}>
            <div className="logo custom-logo">MY SHOOT</div>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to={'/'}>Tirs effectués</Link></Menu.Item>
                <Menu.Item key="2"><Link to={'/addShootingProgram'}>Nouveau tir</Link></Menu.Item>
            </Menu>
        </Header>
    )

}
