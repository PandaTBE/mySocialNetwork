import React from 'react';
import styled from 'styled-components/macro';

const MainStatus = styled.div`
cursor: pointer;
`

class Status extends React.Component {

    state = {
        aditMode: false,
        status: this.props.status
    }
    activateAditMode = () => {
        this.setState({
            aditMode: true
        });
    }
    disableAditMode = () => {
        this.setState({
            aditMode: false
        });
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.target.value
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }
    render() {
        return (
            <>
                {this.state.aditMode
                    ? <input onChange={this.onStatusChange} onBlur={this.disableAditMode} autoFocus={true} value={this.state.status} type="text" />
                    : <MainStatus onDoubleClick={this.activateAditMode}>{this.props.status ? this.props.status : '-----'}</MainStatus>
                }
            </>
        )
    }
}

export default Status;