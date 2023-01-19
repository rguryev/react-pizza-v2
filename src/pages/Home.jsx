import React from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index';
import Sort from '../components/Sort';
import Categories from '../components/Categories';

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		try {
			fetch('https://63c5ae74f80fabd877ee1f3f.mockapi.io/items')
				.then(res => res.json())
				.then(json => {
					setItems(json);
					setIsLoading(false);
				});
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
		}
	}, []);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</div>
	);
};

export default Home;
