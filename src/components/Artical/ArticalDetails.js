import React, { Component } from 'react'

export default class ArticalDetails extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                文章{this.props.match.params.id}
            </div>
        )
    }
}
