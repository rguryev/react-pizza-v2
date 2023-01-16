import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		try {
			fetch('https://63c5ae74f80fabd877ee1f3f.mockapi.io/items')
				.then(res => res.json())
				.then(json => {
					setItems(json);
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{items.map(obj => (
							<PizzaBlock key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
