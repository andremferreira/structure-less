import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const headerProps = {
    icon: 'comments-o',
    title: 'Alert Messager',
    subtitle: 'Alert Message Manager System: Add, List, Modify and Remove.'
}

const baseUrl = 'http://localhost:3001/messeges'
const initialState = {
    messeges: { id: '', code: '', msgObj: { id: '', lang: '', title: '', info: '', alet: '' } },
    list: [], msgObj: { id: '', lang: '', title: '', info: '', alet: '' }
}


export default class MessegesCrud extends Component {

    state = { ...initialState }
    children = { ...initialState.msgObj }

    // componentDidMount componentWillMount (){
    componentDidMount() {
        axios.get(baseUrl).then(resp => {
            console.log('resp.data: ', resp.data)
            this.setState({ list: resp.data })
        })
    }


    clear() {
        this.setState({ messeges: initialState.messeges })
    }

    save() {
        const messeges = this.state.messeges
        const method = messeges.id ? 'put' : 'post'
        const url = messeges.id ? `${baseUrl}/${messeges.id}` : baseUrl
        axios[method](url, messeges).then(
            resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ messeges: initialState, list })
            }
        )
        this.setState({ messeges: initialState.messeges })
    }

    getUpdatedList(messeges, add = true) {
        // const list = this.state.list.filter(u => u.id !== messeges.id)
        const list = this.state.list.filter(u => u.id === messeges.id)
        // const list2 = this.state.list.filter(u => u.id !== messeges.id)
        console.log(list)
        if (add) list.unshift(messeges)
        return list
    }

    getUpdatedListChildren(children, add = true) {
        // const list = this.state.list.filter(u => u.id !== messeges.id)
        const list = this.state.list.filter(u => u.msgObj.id === children.id)
        // const list2 = this.state.list.filter(u => u.id !== messeges.id)
        console.log(list)
        if (add) list.unshift(children)
        return list
    }

    updateField(event) {
        const messeges = { ...this.state.messeges }
        messeges[event.target.messeges] = event.target.value
        this.setState({ messeges })
    }

    updateFieldChildren(event) {
        const messeges = { ...this.state.messeges }
        const children = { ...this.state.messeges.msgObj }
        children[event.target.children] = event.target.value
        console.log('Children: ', { children })
        console.log('Messeges: ', { messeges })
        this.setState({ messeges })
    }

    renderTitle() {
        return (

            <div class="display-4">Dialog Manager
                <div>
                    <h4>
                        {/* <p className='mb-0'>Sytem of manger: Add, Modify and Remove..</p> */}
                    </h4>
                </div>
            </div>

        )
    }

    renderForm() {
        return (
            <div>
                    <div id="addNewCodeTitle" className="d-flex flex-row">
                        <div class="d-flex flex-row ml-3 mt-2">
                            <Button border="1" color="success" id="addNew" style={{ marginBottom: '1rem'}}>
                                <div class="d-flex d-block flex-row justify-content-end">
                                    <span className="fa fa-plus"></span>
                                </div>
                            </Button>
                        </div>
                        <div class="d-flex align-self-start">
                            <span class="d-block p-3">
                                <h5>Add new messege dialog...</h5>
                            </span>
                        </div>
                    </div>
                    <UncontrolledCollapse toggler="#addNew">
                        <Card>
                            <CardBody>
                                <div className="form">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <div class="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <span class="input-group-text mr-2 text-dark">Code</span>
                                                    <input type="text" className="form-control"
                                                        name="codeError"
                                                        value={this.state.messeges.code}
                                                        onChange={e => this.updateField(e)}
                                                        placeholder="Informe o nome..." />
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="d-flex p-2 bg-secondary">
                                                <div class="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <span class="input-group-text mr-2" >Language</span>
                                                        <input type="text" className="form-control"
                                                            name="lang"
                                                            value={this.state.msgObj.lang}
                                                            onChange={f => this.updateFieldChildren(f)}
                                                            placeholder='Report the language code...' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
            </div>
        )
    }

    load(messeges) {
        this.setState({ messeges })
    }

    loadChildren(msgObj) {
        // this.children = { msgObj }
        // console.log( {...this.children} )
        console.log({ msgObj })
        this.setState({ msgObj })
        console.log({ ...this.children })
    }

    remove(messeges) {
        axios.delete(`${baseUrl}/${messeges.id}`).then(resp => {
            const list = this.getUpdatedList(messeges, false)
            this.setState({ list })
        })
    }

    // removeSub(messeges, children) {
    //     axios.update(`${baseUrl}/${messeges.id}`).then(resp => {
    //         const list = this.getUpdatedListChildren(children, false)
    //          console.log(list)
    //          this.setState({ list })
    //     })
    // }

    renderTable() {
        return (
            <table className="table table-hover table-striped mt-2">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Messeges Obj</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        console.log('Messeges: ', this.state.list)
        return this.state.list.map(messeges => {
            return (
                <tr key={messeges.id}>
                    <td>{messeges.id}</td>
                    <td>{messeges.code}</td>
                    <td>{messeges.msgObj && this.renderTableChildren(messeges.msgObj)}</td>
                    <td>
                        {/* <div className="d-flex justify-content-center">
                            <button className="btn btn-success"
                                onClick={() => this.addMsgObj(messeges.msgObj)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div> */}
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-warning mt-2"
                                onClick={() => this.load(messeges)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-danger mt-2"
                                onClick={() => this.remove(messeges)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    addMsgObj(list) {
        return list.map((msgObj) => {
            return (
                <value>{msgObj.id || 1}</value>
            )
        })
    }

    renderTableChildren(list) {
        return (
            <table className="table">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Language</th>
                        <th>Title</th>
                        <th>Info Message</th>
                        <th>Type Alert</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {this.renderRowsChildren(list)}
                </tbody>
            </table>
        );
    }

    renderRowsChildren(list) {
        console.log(list);
        return list.map((msgObj) => {
            return (
                <tr class={"table-" + msgObj.type + ""} key={msgObj.id}>
                    <td width="48">{msgObj.id}</td>
                    <td width="117">{msgObj.lang}</td>
                    <td width="226">{msgObj.title}</td>
                    <td width="350">{msgObj.info}</td>
                    <td width="121">{msgObj.type}</td>
                    <td>
                        <button className="btn btn-success"
                            onClick={() => this.addMsgObj(msgObj)}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button className="btn btn-warning ml-2"
                            onClick={() => this.loadChildren(msgObj)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.removeSub(msgObj)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTitle()}
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}