import { UPDATE_LOG } from '../constants';

export function updateLog(log) {
  return {
    type: UPDATE_LOG,
    log: log,
  };
}
