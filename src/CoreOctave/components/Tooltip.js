import {setDisplayName} from 'realue';
import {compose, mapProps, setPropTypes} from 'recompose';
import {Tooltip as BaseTooltip} from '@material-ui/core';

import types from 'prop-types';

export const Tooltip = compose(
    setPropTypes({
        title: types.string,
        placement: types.string,
        disabled: types.bool,
    }),
    mapProps(({disabled, ...props}) => ({
        enterDelay: 1000,
        disableHoverListener: disabled,
        disableFocusListener: disabled,
        disableTouchListener: disabled,
        ...props,
    })),
    setDisplayName('Tooltip'),
)(BaseTooltip);
