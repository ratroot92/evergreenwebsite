/* eslint-disable  */
import apiServer from '../../config/axios.config';
import { setLoading } from './ui-actions';

const handleAction =
  (payload = {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiServer[payload.reqType](`${payload.url}`, payload.payload);
      if (status === 200) {
        dispatch({ type: payload.type, payload: data.data });
      }
    } catch (err) {
    } finally {
      dispatch(setLoading(false));
    }
  };
export default handleAction;
