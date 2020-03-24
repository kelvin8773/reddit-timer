import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import Search from './search';

const Main = () => (
    <div className="Main text-center">
        <Switch>
            <Route path="/">
                Home Content Here. (learn React)
            </Route>

            <Route path="/search">
                <Search />
            </Route>
        </Switch>
    </div>
);

export default Main;



