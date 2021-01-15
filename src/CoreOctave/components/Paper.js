import React, {memo} from 'react';
import {compose} from 'recompose';
import {setDisplayName} from 'realue';
import clsx from 'clsx';
import {Paper as BasePaper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import {withForwardedRef} from '../decorators/withForwardedRef';

export const Paper = compose(
    withForwardedRef,
    memo,
    withStyles({
        root: {
            '&$squareTop': {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            },
            '&$squareBottom': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            },
        },
        squareTop: {},
        squareBottom: {},
    }),
    setDisplayName('Paper'),
)(({classes, className, squareTop, squareBottom, forwardedRef, ...props}) => (
    <BasePaper
        className={clsx(
            classes.root,
            squareTop && classes.squareTop,
            squareBottom && classes.squareBottom,
            className,
        )}
        ref={forwardedRef}
        {...props}
    />
));
