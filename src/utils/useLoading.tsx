import React from 'react';
import { CircularProgress } from '@nextui-org/react';

export const useLoading = () => {
  const [loading, setLoading] = React.useState(true);
  const delaySetFalse = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const setVal = (val: boolean) => {
    if (val) setLoading(true);
    else delaySetFalse();
  };

  const Loading = () => {
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <CircularProgress color="primary" aria-label="Loading..." />
      </div>
    );
  };

  return { isLoading: loading, Loading, setLoading: setVal };
};
