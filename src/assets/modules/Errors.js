import _ from 'lodash';

export default class Errors {
    /**
     * create new Errors instance
     */
    constructor() {
        this.errors = {};
    }

    /**
     * determine if an error exists for the given field
     * 
     * @param {string} field
     */
    has(field) {
        return Object.prototype.hasOwnProperty.call(this.errors, field);
    }

    // /**
    //  * @param  field 
    //  * @param message 
    //  */
    // set(field, message) {
    //     _.set(this.errors, field, message);
    // }

    /**
     * retrieve error message for a field
     */
    get(field = null) {
        if(!field) {
            return this.errors;
        }

        let error = _.get(this.errors, field);

        if(error) {
            if(Array.isArray(error)) {
                return error[0];
            }

            return error;
        }
    }

    /**
     * push the errors to existing errors
     */
    push(errors) {
        this.errors = _.merge(this.errors, errors);
    }

    /**
     * record new errors
     */
    record(errors) {
        this.errors = errors;
    }

    /**
     * clear one or all errors
     */
    clear(field) {
        if(field) {
            _.unset(this.errors, field);

            return;
        }

        this.errors = {};
    }

}