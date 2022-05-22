import { useTransition } from '@remix-run/react';
import { Grid } from 'react-loader-spinner';

export const LoaderBar = () => {
  const { state } = useTransition();

  return state === 'loading' ? (
    <div style={{ position: 'fixed', top: '50vh', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
      <Grid ariaLabel="loading-indicator" color="#f11818" />
    </div>
  ) : null;
};
