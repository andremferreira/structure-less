import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'home',
    title: 'Home',
    subtitle: 'Initial page - Welcome...'
}

export default class WelcomePage extends Component {

    renderWelcome() {
        return (
            <div className="jumbotron">
                <h1>Welcome to - System of Dialog Manager.</h1>
                <p>Sytem of manger: Add, Modify and Remove. Defaults messages altert for strctrure-less.</p>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderWelcome()}
            </Main>
        )
    }
}