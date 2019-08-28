const Jsontable = require('../models').Jsontable;
const Group = require('../models').Group;
// CRUD
module.exports = {
    // Método de listagem
    list(req, res) {
        return Jsontable
            .findAll({
                include: Group
            }, {
                order: ['dat_create', 'DESC']
            })
            .then((jsontable) => res.status(200).send(jsontable))
            .catch((error) => {
                res.status(400).send(error);
            });
    },
    // Método de listagem por isn_group
    listTableByIdGroup(req, res) {
        return Jsontable
            .findAll({
                attributes: [
                    'jsn_obj'
                ]
            }, {
                where: {
                    // flg_control: true,
                    isn_group: req.body.id
                }
            }, {
                order: {
                    jsn_obj: {
                        ['id']: 'DESC'
                    }
                },
            })
            .then((jsontable) => {
                console.log(jsontable)
                res.status(200).send(jsontable)

            })
            .catch((error) => {
                res.status(400).send(error);
            });
    },
    // Método de seleção por ID
    getById(req, res) {
        return Jsontable
            .findAll({
                where: {
                    isn_jsontable: req.params.id
                }
            })
            .then((jsontable) => {
                if (!jsontable) {
                    return res.status(404).send({
                        message: 'Dados não encontrados ou inexistente.'
                    });
                }
                return res.status(200).send(jsontable);
            })
            .catch((error) => res.status(400).send(error));
    },
    // Método de Inclusão
    add(req, res) {
        return Jsontable
            .findAll({
                where: [isn_group]
            })
            .create({
                isn_group: req.body.isn_group,
                flg_control: req.body.flg_ativo,
                jsn_obj: req.body.jsn_obj
            }, {})
            .then((jsontable) => res.status(201).send(jsontable))
            .catch((error) => res.status(400).send(error));
    },
    // Método de Update
    update(req, res) {
        return Jsontable
            .findById(req.params.isn_jsontable, {})
            .then(jsontable => {
                if (!jsontable) {
                    return res.status(404).send({
                        message: 'Dados não encontrados ou inexistente.'
                    });
                }
                return jsontable
                    .update({
                        id_group: req.body.isn_group || jsontable.isn_group,
                        jsn_obj: req.body.jsn_obj || jsontable.jsn_obj,
                        flg_ativo: req.body.flg_ativo || jsontable.flg_ativo
                    })
                    .then(() => res.status(200).send(jsontable))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    // Método de Exclusão
    delete(req, res) {
        return Jsontable
            .findById(req.params.isn_jsontable)
            .then(jsontable => {
                if (!jsontable) {
                    return res.status(400).send({
                        message: 'Dados não encontrados ou inexistente.'
                    });
                }
                return jsontable
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}