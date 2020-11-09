"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personController_1 = require("../controller/personController");
class PersonRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', personController_1.personController.list);
        this.router.get('/:id', personController_1.personController.getOne);
        this.router.post('/', personController_1.personController.create);
        this.router.put('/:id', personController_1.personController.update);
        this.router.delete('/:id', personController_1.personController.delete);
    }
}
const personRoutes = new PersonRoutes();
exports.default = personRoutes.router;
