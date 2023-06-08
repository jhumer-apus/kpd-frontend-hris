import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
// import { RootState } from '../store'; // Update with your RootState type

const useDtrState = () => {
    const viewDtrReports = useSelector((state: RootState) => state.dtr?.viewDtrReports);
    const { spButtonIndex, spButtonStr, spButtonError } = viewDtrReports?.splitButton || {};
    const { dtrStatus, dtrError, dtrData } = viewDtrReports?.currentView || {};

  return {
    spButtonIndex,
    spButtonStr,
    spButtonError,
    dtrStatus,
    dtrError,
    dtrData,
  };
};

export default useDtrState;


// Usage:
// const { spButtonIndex, spButtonStr, spButtonError, dtrStatus, dtrError, dtrData } = useDtrState();