
import { Login } from '@Capure/lib/models';
import { Validator } from 'fluentvalidation-ts';

export class LoginValidator extends Validator<Login> {
    constructor() {
        super();
        this.ruleFor('email').notEmpty().withMessage('EmailIsEmpty');
        this.ruleFor('password').notEmpty().withMessage('PasswordIsEmpty');

    }
}