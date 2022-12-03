import apiServer from "../../config/axios.config";
import { startLoading, stopLoading } from './ui-actions'

const handleAction = (payload = {}) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const { data, status } = await apiServer[payload.reqType](`${payload.url}`, payload.payload);
        // console.log("**********************************")
        // console.log("options      ==>", payload)
        // console.log("data         ==>", data)
        // console.log("data.data    ==>", data.data)
        // console.log("status       ==>", status)
        // console.log("**********************************")
        if (status === 200) {
            dispatch({ type: payload.type, payload: data.data });
        }
    } catch (err) {
        // dispatch({ type: payload.type, payload: null });
    } finally {
        dispatch(stopLoading());
    }
}
export default handleAction