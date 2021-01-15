import React from 'react';
import {compose, branch} from 'recompose';
import {hasProp} from 'realue';

import {Tooltip} from '../components/Tooltip';

import {withForwardedRef} from './withForwardedRef';

export const withTooltip = branch(
    hasProp('title'),
    compose(
        (Component) => ({
            title,
            disabledTitle = !title,
            titlePlacement,
            ...props
        }) => (
            <Tooltip
                title={title}
                disabled={disabledTitle}
                placement={titlePlacement}
            >
                {props.disabled ? (
                    <span>
                        <Component {...props} />
                    </span>
                ) : (
                    <Component {...props} />
                )}
            </Tooltip>
        ),
        withForwardedRef,
    ),
);
