import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import MessegesCrud from '../components/messages/MessegesCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/messeges' component={MessegesCrud} />
        <Redirect from='*' to='/' />
    </Switch>