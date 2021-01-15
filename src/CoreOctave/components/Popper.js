import React, {memo} from 'react';
import {compose, setPropTypes} from 'recompose';
import {Null, setDisplayName} from 'realue';
import {withStyles} from '@material-ui/core/styles';
import {Popper as BasePopper, ClickAwayListener} from '@material-ui/core';
import * as types from 'prop-types';
import clsx from 'clsx';

import {Paper} from './Paper';

export const Popper =
  process.env.BABEL_ENV === 'test' ?
      Null :
      compose(
          memo,
          setPropTypes({
              value: types.element.isRequired,
              node: types.oneOfType([types.element, types.object]),
              placement: types.oneOf([
                  'bottom-end',
                  'bottom-start',
                  'bottom',
                  'left-end',
                  'left-start',
                  'left',
                  'right-end',
                  'right-start',
                  'right',
                  'top-end',
                  'top-start',
                  'top',
              ]),
              color: types.oneOf(['error']),
              open: types.bool,
              modifiers: types.object,
              onClose: types.func,
          }),
          withStyles((theme) => ({
              root: {
                  'z-index': 100,
              },
              paper: {
                  padding: theme.spacing(1),
                  maxWidth: ({maxWidth}) => maxWidth,
                  width: ({width}) => width,
                  backgroundColor: ({color}) =>
                      color === 'error' ?
                          theme.palette.error.backgroundLight :
                          'default',
                  '&$squareTop': {
                      '&$top-start': {
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                      },
                      '&$bottom-start': {
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                      },
                  },
              },
              squareTop: {},
              'top-start': {},
              'bottom-start': {},
          })),
          setDisplayName('Popper'),
      )(
          ({
              classes,
              className,
              squareTop,
              value,
              node,
              open = false,
              placement = 'bottom-start',
              onClose,
              modifiers = {
                  preventOverflow: {
                      enabled: true,
                      boundariesElement: 'viewport',
                  },
              },
          }) => (
              <BasePopper
                  open={open}
                  anchorEl={node}
                  className={classes.root}
                  placement={placement}
                  modifiers={modifiers}
              >
                  {({placement}) => (
                      <ClickAwayListener onClickAway={onClose}>
                          <Paper
                              className={clsx(
                                  classes.paper,
                                  squareTop && classes.squareTop,
                                  placement && squareTop && classes[placement],
                                  className,
                              )}
                              elevation={4}
                          >
                              {value}
                          </Paper>
                      </ClickAwayListener>
                  )}
              </BasePopper>
          ),
      );
