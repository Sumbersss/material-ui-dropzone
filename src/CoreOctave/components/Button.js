import React, {memo} from 'react';
import {
    compose,
    setPropTypes,
    withHandlers,
    withPropsOnChange,
} from 'recompose';
import {setDisplayName} from 'realue';
import {Button as BaseButton, CircularProgress} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import types from 'prop-types';

import {withTooltip} from '../decorators/withTooltip';

export const Button = compose(
    memo,
    setPropTypes({
        value: types.any,
        name: types.string,
        onChange: types.func,
        onClick: types.func,
        to: types.string,
        disabled: types.bool,
        done: types.bool,
        confirmProps: types.object,
        title: types.node,
        disabledTitle: types.bool,
        Component: types.node,
    }),
    withPropsOnChange(
        ['disabled', 'onChange', 'onClick', 'to', 'done', 'Component'],
        ({
            disabled,
            onChange,
            onClick,
            to,
            done = true,
            Component = BaseButton,
        }) => ({
            disabled: disabled || !(onChange || onClick || to) || !done,
            Component,
            ...(done || Component !== BaseButton ?
                null :
                {
                    startIcon: (
                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            color="inherit"
                            size="1rem"
                        />
                    ),
                }),
        }),
    ),
    withTooltip,
    withHandlers({
        onClick: ({disabled, onClick, onChange, name, value}) => (event) => {
            if (disabled) {
                return;
            }
            if (onClick) {
                onClick(event);
            }
            if (onChange) {
                onChange(value, name, event);
            }
        },
    }),
    withStyles((theme) => ({
        root: {
            color: theme.palette.error.main,
        },
    })),
    setDisplayName('Button'),
)(
    ({
        children,
        onClick,
        disabled,
        color,
        classes,
        Component,
        forwardedRef,
        ...props
    }) => (
        <Component
            disabled={disabled}
            onClick={onClick}
            color={color === 'error' ? undefined : color}
            classes={color === 'error' ? classes : undefined}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </Component>
    ),
);
