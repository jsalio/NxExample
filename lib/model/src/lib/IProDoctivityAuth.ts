import { Login } from "./Login";


export interface IProDoctivityAuth {
    LoginUser(request: Login): Promise<string>;
}
