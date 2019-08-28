import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const headerProps = {
    icon: 'comments-o',
    title: 'Alert Messager',
    subtitle: 'Alert Message Manager System: Add, List, Modify and Remove.'
}

const baseUrl = 'http://localhost:3001/messages'
const initialState = {
    messeges: { id: '', code: '', msgObj: { id: '', lang: '', title: '', info: '', alet: '' } },
    list: [], msgObj: { id: '', lang: '', title: '', info: '', alet: '' }, collapse: true
}



export default class MessegesCrud extends Component {

    state = { ...initialState }
    children = { ...initialState.msgObj }
    alertIcon = "fa fa-commenting text-secundary fa-2x"

    // componentDidMount componentWillMount (){
    componentDidMount() {
        axios.get(baseUrl).then(resp => {
            // console.log('resp.data: ', resp.data)
            this.toggle = this.toggle.bind(this);
            this.setState({ list: resp.data })
        })
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
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
        if (add) list.unshift(messeges)
        return list
    }

    getUpdatedListChildren(children, add = true) {
        // const list = this.state.list.filter(u => u.id !== messeges.id)
        const list = this.state.list.filter(u => u.msgObj.id === children.id)
        // const list2 = this.state.list.filter(u => u.id !== messeges.id)
        // console.log(list)
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
        this.setState({ messeges })
    }

    renderTitle() {
        return (

            <div><h1>Dialog Manager</h1>
                <div>
                    <h4>
                        <p>Sytem of manger: Add, Modify and Remove..</p>
                    </h4>
                </div>
            </div>

        )
    }

    renderIcon() {
        if (this.state.collapse === false) {
            return "fa fa-plus"
        } else {
            return "fa fa-minus"
        }
    }

    renderBgColor() {
        if (this.state.collapse === false) {
            return "success"
        } else {
            return "danger"
        }
    }

    alertType(event) {
        switch (event.target.value) {
            case "info":
                this.alertIcon = "fa fa-info-circle text-info fa-2x";
                break;
            case "success":
                this.alertIcon = "fa fa-check-circle text-success fa-2x";
                break;
            case "warning":
                this.alertIcon = "fa fa-exclamation-circle text-warning fa-2x";
                break;
            case "danger":
                this.alertIcon = "fa fa-times-circle text-danger fa-2x";
                break;
            default:
                this.alertIcon = "fa fa-commenting text-secundary fa-2x";
    }
    return this.alertIcon;
}

    renderForm() {
        return (
            <div>
                <div id="addNewCodeTitle" className="d-flex flex-row ">
                    <div className="d-flex flex-row ml-3 mt-2 pt-2">
                        <Button onClick={this.toggle} color={this.renderBgColor()} id="addNew" style={{ marginBottom: '1rem' }}>
                            <div className="d-flex d-block flex-row justify-content-end">
                                <span className={this.renderIcon()}></span>
                            </div>
                        </Button>
                    </div>
                    <div className="d-flex align-self-start pt-2">
                        <span className="d-block p-3">
                            <h5>Add new messege dialog...</h5>
                        </span>
                    </div>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <div className="form">
                                <div className="form-group">
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mr-2 text-dark">Code</span>
                                            <input type="text" className="form-control"
                                                name="codeError"
                                                value={this.state.messeges.code}
                                                onChange={e => this.updateField(e)}
                                                placeholder="Informe o nome..." />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mr-2" >Language</span>
                                            <input type="text" className="form-control mr-2"
                                                name="lang"
                                                value={this.state.msgObj.lang}
                                                onChange={f => this.updateFieldChildren(f)}
                                                placeholder='Report the language code...' />
                                        </div>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mr-2" >Title</span>
                                            <input type="text" className="form-control mr-2"
                                                name="tile"
                                                value={this.state.msgObj.title}
                                                onChange={f => this.updateFieldChildren(f)}
                                                placeholder='Add a title...' />
                                        </div>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mr-2" >Type</span>
                                            <select className="form-control"
                                                name="type"
                                                value={this.state.msgObj.type}
                                                placeholder="Select..."
                                                option="Select..."
                                                onChange={f => { 
                                                    this.updateFieldChildren(f)
                                                    this.alertType(f)
                                                }}>
                                                    <option defaultValue="Select.." hidden >Choose here...</option>
                                                    <option value="info">Info</option>
                                                    <option value="success">Success</option>
                                                    <option value="warning">Warning</option>
                                                    <option value="danger">Danger</option>
                                            </select>
                                        </div>
                                        <div className="input-group-prepend col-md-3 col-sm-4">
                                            <i className={this.alertIcon}></i>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex row-flex mb-2"> */}
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mr-2" >Description</span>
                                            <textarea className="form-control" rows="2"
                                                name="info"
                                                value={this.state.msgObj.info}
                                                onChange={f => this.updateFieldChildren(f)}
                                                placeholder='Add a title...' />
                                        </div>
                                    {/* </div> */}
                                    <hr />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

    load(messeges) {
        this.setState({ messeges })
    }

    loadChildren(msgObj, id, code) {
        // this.children = { msgObj }
        // console.log( {...this.children} )

        // console.log({ msgObj })
        this.setState({ msgObj })
        this.setState({ messeges: { id: id, code: code } })
        // console.log({ ...this.children })
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
                <thead className="thead-dark">
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
        // console.log('Messeges: ', this.state.list)
        return this.state.list.map(messeges => {
            return (
                <tr key={messeges.id}>
                    <td>{messeges.id}</td>
                    <td>{messeges.code}</td>
                    <td>{messeges.msgObj && this.renderTableChildren(messeges.msgObj, messeges.id, messeges.code)}</td>
                    <td>
                        {/* <div className="d-flex justify-content-center">
                            <button className="btn btn-success"
                                onClick={() => this.addMsgObj(messeges.msgObj)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div> */}
                        {/* <div className="d-flex justify-content-center">
                            <button className="btn btn-warning mt-2"
                                onClick={() => this.load(messeges)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </div> */}
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

    renderTableChildren(list, id, code) {
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Language</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Type Alert</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {this.renderRowsChildren(list, id, code)}
                </tbody>
            </table>
        );
    }

    renderRowsChildren(list, id, code) {
        // console.log(list);
        return list.map((msgObj) => {
            return (
                <tr className={"table-" + msgObj.type + ""} key={msgObj.id}>
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
                            onClick={() => {
                                return this.loadChildren(msgObj, id, code)
                            }}>
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