import React from 'react';

type CategoriesProps = {
	value: number;
	onChangeCategory: (idx: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
	return (
		<div className='categories'>
			<div></div>
			<ul>
				{categories.map((categoryName, i) => (
					<li onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''} key={i}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
