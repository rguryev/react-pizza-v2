import React from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

	React.useEffect(() => {
		try {
			setIsLoading(true);

			const sortBy = sortType.sortProperty.replace('-', '');
			const order = sortType.sortProperty.includes('-') ? `asc` : `desc`;
			const category = categoryId > 0 ? `category=${categoryId}` : '';

			fetch(
				`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
			)
				.then(res => res.json())
				.then(json => {
					setItems(json);
					setIsLoading(false);
				});
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
		}
	}, [categoryId, sortType]);

	console.log(categoryId, sortType);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
				<Sort value={sortType} onChangeSort={i => setSortType(i)} />
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
