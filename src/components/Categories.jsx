import React from 'react';

const Categories = () => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const [activeIndex, setActiveIndex] = React.useState(2);

	const onClickCategory = index => {
		setActiveIndex(index);
	};

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, i) => (
					<li
						onClick={() => onClickCategory(i)}
						className={activeIndex === i ? 'active' : ''}
						key={i}>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
