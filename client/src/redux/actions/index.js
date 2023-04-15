/* eslint-disable  */
import apiServer from '../../config/axios.config';

const handleAction = (payload = {}) => {
  return async (dispatch) => {
    const { data, status } = await apiServer[payload.reqType](`${payload.url}`, payload.payload);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('data', data);
    console.log('status', status);
    console.log({ type: payload.type, payload: data.data });
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    if (status === 200) {
      dispatch({ type: payload.type, payload: data.data });
    }
  };
};
export default handleAction;
