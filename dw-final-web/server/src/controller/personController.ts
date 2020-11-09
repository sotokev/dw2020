import {Request, Response} from 'express';

class PersonController {
    
    public list(req: Request, res: Response){
        res.json('index persona');
    }

    public create(req: Request, res: Response){
        console.log(req.body);
        res.json('creando persona');
    }

    public update(req: Request, res: Response){
        res.json('actualizando persona'+req.params.id);
    }

    public delete(req: Request, res: Response){
        res.json('eliminando persona'+req.params.id);
    }

    public getOne(req: Request, res: Response){
        res.json('obteniendo persona '+req.params.id);
    }
}

export const personController = new PersonController();