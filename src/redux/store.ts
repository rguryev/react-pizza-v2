import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
	reducer: { filter, cart, pizza },
});

// создаем тип RootState (главный стейт куда включается filter, cart, pizza)
// store - это редакс - все наши стейты, диспатчи, подписки. Вытаскиваем функцию .getState которая вернет весь стейт. Мы не вызываем эту функцию, мы получаем только тип этой функции
// Мы получили тип этой функции (с помощью typeof) и чтобы из функции вытащить только ее содержимое (глобальный стейт не является функцией, мы же не пишем store().filter) - пишем ReturnType (тип тайпскрипта: он берет любую функцию, берет все содержимое и превращает в тип)
// Аналогия с шоколадом: <typeof store.getState> - тип функции (обертка с шоколадкой) ReturnType вынимает содержимое и делает из содержимого тип
// Таким образом мы получили тип всего хранилища

// тип FuncType возвращает функцию (шоколадка в обертке) FuncType - это функция
type FuncType = typeof store.getState;
// из функции возвращаем содержимое и делаем из него тип (шоколадка без обертки) RootState - это объект
export type RootState = ReturnType<FuncType>;
// Это нужно для того, чтобы автоматизировать типизацию стейта, иначе бы нам пришлось вручную добавлять типы в RootState, импортировать слайсы и тд
// type RootState = {
// 	cart: CartSliceState;
// 	filter: FilterSliceState;
// 	pizza: PizzaSliceState;
// 	...
// }

// когда store был создан (внутри есть слайсы, диспатчи и тд), и у него есть диспатч, диспатч после импорта инициализировался const dispatch = useDispatch(). Говорим: диспатч, дай все экшены которые у тебя могут быть внутри всех слайсов, он всех их типы вытащит с помощью typeof и сохрани в AppDispatch
type AppDispatch = typeof store.dispatch;
// теперь говорим что у нас есть специальный хук useAppDispatch - это обычный диспатч, но с типами. Экспортируем и используем в Home.tsx
export const useAppDispatch = () => useDispatch<AppDispatch>();
