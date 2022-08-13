const Filter = ({
	searchName,
	serachResult,
	handleSearch,
	handleKeyDown,
}) => {
	return (
		<div>
			filter shown with{' '}
			<input
				type='text'
				value={searchName}
				onChange={handleSearch}
				onKeyDown={handleKeyDown}
			/>
			<p>Search Result:</p>
			<ul>
				{serachResult.map((person) => (
					<li key={person.name}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};
export default Filter;
