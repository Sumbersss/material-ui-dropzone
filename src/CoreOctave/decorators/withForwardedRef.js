import {compose} from 'recompose';
import {forwardRef} from 'react';

export const withForwardedRef = compose(
    forwardRef,
    (Component) => (props, ref) => <Component forwardedRef={ref} {...props} />,
);
