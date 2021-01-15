import test from 'ava';

import {important} from '../important';

test('returns style to important', (assert) => {
    assert.is(important('100%'), '100% !important');
});
