import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from 'inversify-express-utils';
import { injectable, inject } from "inversify";
import { IGenericRequest, IProDoctivityAuth, Login } from '@Capure/lib/models';
import { LoginUser } from '@Capure/lib/core'

@controller("/api/auth")
export class AuthController implements interfaces.Controller, IGenericRequest<Login> {

    credentialLogin: Login;

    constructor(@inject("ProDoctivityAdpater") private authAdapter: IProDoctivityAuth) { }


    @httpPost("/login")
    private async login(@request() req: express.Request, @response() res: express.Response) {
        const login = new LoginUser(this, this.authAdapter);
        Validate(login.validate(), res);
        const result = login.execute();
        if (result.Some) {
            res.status(200).json(result.value);
        }
        else {
            res.status(400).json(result.value);
        }
    }

    build(): Login {
        return this.credentialLogin;
    }

}

function Validate(validationErrors: Generator<any, void, unknown>, res: express.Response) {
    const errors = Array.from(validationErrors);
    // if error is empty then return
    // else  return 400 with errors
    if (errors.length > 0) {
        res.status(400).json(errors);
    }
}
