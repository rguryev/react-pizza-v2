import React from 'react';
import Loadable from 'react-loadable';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
import Home from './pages/Home';

import './scss/app.scss';

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

const Cart = Loadable({
	loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
	loading: () => <div>Loadable-Загрузка...</div>,
});

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<React.Suspense fallback={<div>Загрузка корзины...</div>}>
							<Cart />
						</React.Suspense>
					}
				/>
				<Route
					path='pizza/:id'
					element={
						<React.Suspense fallback={<div>Загрузка пиццы...</div>}>
							<FullPizza />
						</React.Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<React.Suspense fallback={<div>Загрузка 404...</div>}>
							<NotFound />
						</React.Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
