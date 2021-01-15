import {compose, withProps} from 'recompose';
import {setDisplayName} from 'realue';
import {IconButton} from '@material-ui/core';

import {Button} from './Button';

export const ButtonIcon = compose(
    withProps({Component: IconButton}),
    setDisplayName('ButtonIcon'),
)(Button);
