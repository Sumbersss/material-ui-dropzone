import {reduce, isPlainObject} from 'lodash';
import {replaceAll} from 'realue';

// eslint-disable-next-line id-length
export function t(singular, plural, count) {
    if (plural == null) {
        return singular;
    }
    if (isPlainObject(plural)) {
    /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const regex = /\${([a-zA-Z][a-zA-Z0-9]*)}/g;
            let match = null;
            while ((match = regex.exec(singular))) {
                const variable = match[1];
                if (plural[variable] == null) {
                    throw new Error(`Missing variable '${variable}'`);
                }
            }
        }
        return reduce(
            plural,
            (string, value, name) => replaceAll(string, `\${${name}}`, value),
            singular,
        );
    }
    return count === 1 ? singular : plural;
}
