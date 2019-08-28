const jsontableController = require('../controllers').Jsontable;
const groupController = require('../controllers').Group;
module.exports = (app) => {
//
    // teste do serviço
    // app.get('/api', (req, res) => res.status(200).send({
    //     message: 'Entrou em rotas dentro da api!'
    // }));
//
// CRUD tabela grpfamily
app.get('/api/group', groupController.list);
app.get('/api/group/:id', groupController.getById);
app.post('/api/group/', groupController.add);
app.put('/api/group/:id', groupController.update);
app.delete('/api/group/:id', groupController.delete);
// Set sequência do id json_obj
app.post('/api/seqgrupo/:id', groupController.setNextSeq);

// CRUD tabela jsontable
app.get('/api/jsontable', jsontableController.list);
app.get('/api/jsontable/:id', jsontableController.getById);
app.post('/api/jsontable', jsontableController.add);
app.put('/api/jsontable/:id', jsontableController.update);
app.delete('/api/jsontable/:id', jsontableController.delete);
// TESTE
app.get('/api/jsongroup/:id', jsontableController.listTableByIdGroup);

};