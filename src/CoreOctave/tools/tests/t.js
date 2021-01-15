import test from 'ava';

import {t} from '../t';

test('translates singular value', (assert) => {
    assert.is(t('Hello!'), 'Hello!');
    assert.is(t(null), null);
});

test('chooses correct form', (assert) => {
    assert.is(t('device', 'devices', 0), 'devices');
    assert.is(t('device', 'devices', 1), 'device');
    assert.is(t('device', 'devices', 2), 'devices');
    assert.is(t('device', 'devices', null), 'devices');
});

test('replaces variables', (assert) => {
    assert.is(
        t('Hi ${name}!', {
            name: 'John',
        }),
        'Hi John!',
    );
    const count = 3;
    assert.is(
        t('There are ${count} ${entity}.', {
            count,
            entity: t('device', 'devices', count),
        }),
        'There are 3 devices.',
    );
});

test('replaces variables multiple times', (assert) => {
    assert.is(
        t('Hi ${name}! How are you ${name}?', {
            name: 'John',
        }),
        'Hi John! How are you John?',
    );
});

test('throws on missing variable', (assert) => {
    assert.throws(
        () =>
            t('Hi ${name}! Are you ${state} ?', {
                state: 'Happy',
            }),
        {message: "Missing variable 'name'"},
    );
});
