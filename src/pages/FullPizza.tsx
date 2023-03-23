import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items/${id}`);
				setPizza(data);
			} catch (error) {
				console.log(error);
				navigate('/');
			}
		}
		fetchPizza();
		console.log(pizza);
	}, []);

	if (!pizza) {
		return <>Загрузка...</>;
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt={pizza.title} />
			<h2>{pizza.title}</h2>
			<p>Описание {pizza.title}</p>
			<h4>{pizza.price} р.</h4>
			<Link to='/sdfdsf'>
				<button className='button button--outline button--add'>
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
};

export default FullPizza;
