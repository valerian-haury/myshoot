import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {ShootingProgramsList} from "./features/shootingPrograms/ShootingProgramsList";
import {AddShootingProgram} from "./features/shootingPrograms/AddShootingProgram";
import {NavBar} from "./features/components/Navbar";
import {Layout} from "antd";
import {EditShootingProgram} from "./features/shootingPrograms/EditShootingProgram";
import {AddShootingProgram_v2} from "./features/shootingPrograms/AddShootingProgram_v2";
import {EditShootingProgram_v2} from "./features/shootingPrograms/EditShootingProgram_v2";

const {Content, Footer} = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <NavBar/>
                <Content className="site-layout"
                         style={{margin: '0px 50px 0 50px', marginTop: "50px", backgroundColor: "white"}}>
                    <div className="site-layout-background"
                         style={{padding: '24px 12.5px', minHeight: 380, display: "flex", flexWrap: 'wrap'}}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <>
                                        <ShootingProgramsList/>
                                    </>
                                )}
                            />
                            <Route exact path="/program/:programId" component={EditShootingProgram_v2}/>
                            <Route exact path="/addShootingProgram" component={AddShootingProgram_v2}/>
                            <Redirect to="/"/>
                            <Route path='*' exact={true} render={() => (<h1>HOP</h1>)} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>HEG IG Bachelor degree ©2021 - by V.HAURY</Footer>
            </Layout>
        </Router>

    );
}

export default App;
