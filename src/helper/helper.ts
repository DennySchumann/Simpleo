import * as argon2 from 'argon2';

export module Helper {
    /**
     * this function create an object with the params sort and order
     * get the params from the query object
     * finally, the variables are deleted from the query
     *
     * @param query: contains the variable sort and order
     *
     * @return an object with the params sort and order
     */
    export function getSort(query: any): object {
        let sortBy = {};

        if (query.sort && query.order) {
            const sort = query.sort;
            const order = query.order;
            sortBy[sort] = order;
        }
        delete query.sort;
        delete query.order;

        return sortBy;
    }

    /**
     * this function create an object with the params offset and limit
     * get the params from the query object
     * finally, the variables are deleted from the query
     *
     * @param query: contains the variable sort and order
     *
     * @return an object with the params sort and order
     */
    export function getLimit(query: any): any {
        let area = {
            offset: 0,
            limit: 999
        };

        if (query.offset && query.limit) {
            area.offset = parseInt(query.offset);
            area.limit = parseInt(query.limit);
        } else if (query.limit) {
            area.limit = parseInt(query.limit);
        }
        delete query.offset;
        delete query.limit;

        return area;
    }

    export function sanitizeUserData(data: Object): Object {
        const userData = { email_verified: false };
        return {...data, ...userData};
    }

    export function hashPassword(passwordPlaintext: string): Promise<string> {
        return argon2.hash(passwordPlaintext);
    }

    export function verifyPassword(passwordHash: string, passwordPlaintext: string): Promise<boolean> {
        return argon2.verify(passwordHash, passwordPlaintext);
    }
}
