import { startLoading, stopLoading, resetLoading } from "../redux/global/slice";

/**
 * Обертка для асинхронных операций с автоматическим управлением лоадером
 * Использует счетчик активных запросов для корректной работы с параллельными запросами
 *
 * @param {Function} callback - Асинхронная функция для выполнения
 * @param {Function} dispatch - Функция dispatch из Redux
 * @param {Object} options - Дополнительные опции
 * @param {boolean} options.resetOnError - Сбросить состояние лоадера при ошибке
 * @returns {Promise} - Результат выполнения callback
 */
export const withLoader = async (callback, dispatch, options = {}) => {
  dispatch(startLoading());

  try {
    return await callback();
  } catch (error) {
    // При критических ошибках можем полностью сбросить счетчик загрузки
    if (options.resetOnError) {
      dispatch(resetLoading());
    } else {
      dispatch(stopLoading());
    }
    throw error;
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Создает обертку для thunk-операций с автоматическим управлением лоадером
 *
 * @param {Function} thunkCallback - Callback для выполнения внутри thunk
 * @returns {Function} - Функция для использования в createAsyncThunk
 */
export const createThunkWithLoader = (thunkCallback) => {
  return async (arg, thunkAPI) => {
    thunkAPI.dispatch(startLoading());

    try {
      return await thunkCallback(arg, thunkAPI);
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Неизвестная ошибка"
      );
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  };
};

/**
 * Пример использования:
 *
 * // В обычных компонентах:
 * const handleSubmit = async () => {
 *   try {
 *     await withLoader(async () => {
 *       await api.postData(formData);
 *     }, dispatch);
 *     // Обработка успешного выполнения
 *   } catch (error) {
 *     // Обработка ошибки
 *   }
 * };
 *
 * // В redux операциях (вариант 1):
 * export const fetchData = createAsyncThunk(
 *   'data/fetch',
 *   createThunkWithLoader(async (_, thunkAPI) => {
 *     const response = await api.getData();
 *     return response.data;
 *   })
 * );
 *
 * // В redux операциях (вариант 2 - обратная совместимость):
 * export const fetchData = createAsyncThunk(
 *   'data/fetch',
 *   async (_, thunkAPI) => {
 *     thunkAPI.dispatch(startLoading());
 *     try {
 *       const response = await api.getData();
 *       return response.data;
 *     } catch (error) {
 *       return thunkAPI.rejectWithValue(error.message);
 *     } finally {
 *       thunkAPI.dispatch(stopLoading());
 *     }
 *   }
 * );
 */
