const Group = require('../models').Group;
const fs = require('fs')
const path = require('path')

// Configure message report data base
const msgDb = fs.readFileSync(path.resolve(path.resolve(__dirname), '../../msg/db/db.json'), 'utf8')
const dbMsg = JSON.parse(msgDb)

// Define default language
const dLang = 'pt_BR'

// CRUD
module.exports = {
    // List all 

    list(req, res) {
        return Group
            .findAll()
            .then((group) => res.status(200).send(group))
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                                console.log(errResp)
                            }
                        }
                    }
                }
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // Find by id
    getById(req, res) {
        return Group
            .findByPk(req.params.id)
            .then((group) => {
                if (!group) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG NO RESULT - CODE: err-0002
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
                    return res.status(404).send(errResp);
                }
                return res.status(200).send(group);
            })
            .catch((error) => {

                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                            }
                        }
                    }
                }
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // Add new 
    add(req, res) {
        return Group
            .create({
                isn_father: req.body.isn_father || null,
                isn_son: req.body.isn_son || null,
                dsc_group: req.body.dsc_group,
                flg_primal: req.body.flg_primal || false,
                int_seq_group: req.body.int_seq_group || 1
            })
            .then((group) => {

                return res.status(201).send({
                    success: true,
                    message: `Insert item of ID: ${group.isn_group} on groups, was realized with success.`
                })
            })
            .catch((error) => {
                return res.status(400).send({
                    error: true,
                    message: error.original.detail
                })
            })
        // Configure sequence to next available position
        // .then(() => { return Group.sequelize.query("SELECT SETVAL('cog.groups_isn_group_seq'::regclass, COALESCE((SELECT MAX(isn_group::INT) + 1 FROM cog.groups), 1), FALSE)")})
    },
    // Update by id
    update(req, res) {
        return Group
            .findByPk(req.params.id)
            .then(group => {
                if (!group) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG - CODE: err-0002 - NO RESULT
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
                    return res.status(404).send(errResp);
                }
                return group
                    .update({
                        isn_father: req.body.isn_father || group.isn_father,
                        isn_son: req.body.isn_son || group.isn_son,
                        dsc_group: req.body.dsc_group || group.dsc_group,
                        flg_primal: req.body.flg_primal || group.flg_primal,
                        int_seq_group: req.body.int_seq_group || group.int_seq_group
                    })
                    .then((group) => res.status(200).send(group))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                            }
                        }
                    }
                }
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    // Remove by id
    delete(req, res) {
        return Group
            .findByPk(req.params.id)
            .then(group => {
                if (!group) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG - CODE: err-0002 - NO RESULT
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
                    return res.status(404).send(errResp);
                }
                return group
                    .destroy()
                    .then(() => {
                        for (var idKeyA in dbMsg.messages) {
                            // MSG - CODE: suc-0001 - DELETE DONE
                            if (dbMsg.messages[idKeyA].code == 'suc-0001') {
                                var codErrMsg = dbMsg.messages[idKeyA].msgObj
                                var lang = req.query.lang || dLang
                                for (var idkeyB in codErrMsg) {
                                    if (codErrMsg[idkeyB].lang == lang) {
                                        var errResp = codErrMsg[idkeyB]
                                    }
                                }
                            }
                        }
                        return res.status(204).send(errResp);
                    })
                    .catch((error) => {
                        for (var idKeyA in dbMsg.messages) {
                            if (dbMsg.messages[idKeyA].code == error.original.code) {
                                var codErrMsg = dbMsg.messages[idKeyA].msgObj
                                var lang = req.query.lang || dLang
                                for (var idkeyB in codErrMsg) {
                                    if (codErrMsg[idkeyB].lang == lang) {
                                        var errResp = codErrMsg[idkeyB]
                                    }
                                }
                            }
                        }
                        if (!errResp) {
                            return res.status(400).send(error)
                        } else {
                            return res.status(400).send(errResp)
                        }
                    });
            })
            .catch((error) => {
                for (var idKeyA in dbMsg.messages) {
                    if (dbMsg.messages[idKeyA].code == error.original.code) {
                        var codErrMsg = dbMsg.messages[idKeyA].msgObj
                        var lang = req.query.lang || dLang
                        for (var idkeyB in codErrMsg) {
                            if (codErrMsg[idkeyB].lang == lang) {
                                var errResp = codErrMsg[idkeyB]
                            }
                        }
                    }
                }
                if (!errResp) {
                    return res.status(400).send(error)
                } else {
                    return res.status(400).send(errResp)
                }
            });
    },
    setNextSeq(req, res) {
        return Group
            .findByPk(req.params.id, {
                attributes: ['isn_group', 'int_seq_group']
            })
            .then(group => {
                if (!group) {
                    for (var idKeyA in dbMsg.messages) {
                        // MSG - CODE: err-0002 - NO RESULT
                        if (dbMsg.messages[idKeyA].code == 'err-0002') {
                            var codErrMsg = dbMsg.messages[idKeyA].msgObj
                            var lang = req.query.lang || dLang
                            for (var idkeyB in codErrMsg) {
                                if (codErrMsg[idkeyB].lang == lang) {
                                    var errResp = codErrMsg[idkeyB]
                                }
                            }
                        }
                    }
                    return res.status(404).send(errResp);
                }
                return group
                    .update({
                        int_seq_group: (group.int_seq_group + 1)
                    }, {
                        attributes: ['isn_group', 'int_seq_group']
                    }, {
                        where: {
                            isn_group: req.params.id
                        }
                    }, {
                        raw: true
                    })
                    .then((group) => {
                        return res.status(200).send(group)
                    })
                    .catch((error) => res.status(400).send(error));
            })
    }
}