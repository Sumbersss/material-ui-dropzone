import React, {memo, Fragment} from 'react';
import {compose, withStateHandlers, setPropTypes} from 'recompose';
import {withNode, setDisplayName} from 'realue';
import {Flex} from 'realue/layout';
import types from 'prop-types';

import {important} from '../tools/important';

import {Popper} from './Popper';
import {ButtonIcon} from './ButtonIcon';
import {Close, Help} from '@material-ui/icons';
import {withStyles} from '@material-ui/styles';

export const ButtonHelp = compose(
    setPropTypes({
        children: types.node,
        size: types.oneOf(['small', 'medium']),
        open: types.bool,
        maxWidth: types.number,
    }),
    memo,
    withStateHandlers(({open = false}) => ({open}), {
        onCycle: ({open}) => () => ({
            open: !open,
        }),
    }),
    withNode,
    withStyles(({spacing}) => ({
        root: {
            opacity: 0.75,
            display: 'block',
            '&:hover': {
                cursor: 'pointer',
                opacity: 1,
            },
        },
        closeButtonContainer: {
            paddingLeft: spacing(2),
        },
        closeButton: {
            margin: 0,
            '& svg': {
                fontSize: important('0.85rem'),
            },
        },
    })),
    setDisplayName('ButtonHelp'),
)(
    ({
        onCycle,
        children,
        open,
        node,
        classes,
        placement,
        Icon = Help,
        maxWidth = 384,
    }) => (
        <Fragment>
            <Icon
                className={classes.root}
                fontSize="inherit"
                onClick={onCycle}
                ref={node}
            />
            <Popper
                open={open}
                onClose={onCycle}
                node={node.current}
                maxWidth={maxWidth}
                placement={placement}
                value={
                    <Flex container direction="row" align="start">
                        <Flex item grow>
                            {children}
                        </Flex>
                        <Flex item className={classes.closeButtonContainer}>
                            <ButtonIcon
                                onClick={onCycle}
                                size="small"
                                className={classes.closeButton}
                            >
                                <Close size="inherit" />
                            </ButtonIcon>
                        </Flex>
                    </Flex>
                }
            />
        </Fragment>
    ),
);
