"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personController = void 0;
class PersonController {
    list(req, res) {
        res.json('index persona');
    }
    create(req, res) {
        console.log(req.body);
        res.json('creando persona');
    }
    update(req, res) {
        res.json('actualizando persona' + req.params.id);
    }
    delete(req, res) {
        res.json('eliminando persona' + req.params.id);
    }
    getOne(req, res) {
        res.json('obteniendo persona ' + req.params.id);
    }
}
exports.personController = new PersonController();
