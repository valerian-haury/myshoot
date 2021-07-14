import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {ShootingProgramsList} from "./features/shootingPrograms/ShootingProgramsList";
import {AddShootingProgram} from "./features/shootingPrograms/AddShootingProgram";
import {NavBar} from "./features/shootingPrograms/Navbar";
import {Layout} from "antd";

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
                            {/*<Route exact path="/posts/:postId" component={SinglePostPage} />*/}
                            <Route exact path="/addShootingProgram" render={() => <AddShootingProgram/>}/>
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>HEG IG Bachelor degree ©2021 - by V.HAURY</Footer>*/
            </Layout>
        </Router>

    );
}

export default App;
