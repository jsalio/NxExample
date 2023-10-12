import { IGenericRequest, Login, IProDoctivityAuth, Option } from "@Capure/lib/models";
import { ValidationErrors } from "fluentvalidation-ts";
import { LoginValidator } from "../../Validators/login.validator";

export class LoginUser {
    constructor(private request: IGenericRequest<Login>, private auth: IProDoctivityAuth) {
    }

    public *validate() {
        const data = this.request.build();

        if (!data) {
            yield "LoginDataEmpty"
        }

        if (data) {
            const validator = new LoginValidator();
            const result: ValidationErrors<Login> = validator.validate(data);
            for (const key of Object.keys(result)) {
                if (Object.prototype.hasOwnProperty.call(result, key)) {
                    yield result[key];
                }
            }
        }
    }


    public execute(): Option<any, any> {
        const requets = this.request.build();
        try {
            const result = this.auth.LoginUser(requets);
            return new Option<any, any>().Some(result);
        }
        catch (e) {
            return new Option<any, any>().None(e.message);
        }
    }
}