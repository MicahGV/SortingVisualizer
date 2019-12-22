import React, { Component } from 'react'
import './toolbar.css'

export default class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                {this.props.children}
            </div>
        )
    }
}
