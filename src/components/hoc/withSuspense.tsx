import React, { FC, Suspense } from 'react';

export const withSuspense = (Component: FC) => {
    return (props: {}) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    }
}