import React from 'react'
import './Main.css'
import Left from './Left'
import { Switch, Route } from 'react-router'
import Login from './Login'
import Recovery from './Recovery'

const Canvas = props => {
    return (
        <div className="Canvas">
            <Left/>
            <div className="right">
                <Switch>
                    <Route path='/recovery'>
                        <Recovery />
                    </Route>
                    <Route path='/'>
                        <Login />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Canvas;