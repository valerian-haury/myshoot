import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {ShootingProgramsList} from "./features/shootingPrograms/ShootingProgramsList";
import {TargetSelector} from "./features/prototype/TargetSelector";

function App() {
    return (
        <Router>
            <div>
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
                    <Route exact path="/targetselector" render={() => <TargetSelector targetId={1} />} />
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
