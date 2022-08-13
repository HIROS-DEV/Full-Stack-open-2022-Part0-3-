const FindCountries = ({
	searchCountries,
	tooManyFetchedMessage,
	handleSearchCountries,
	handleKeyDownForSearchingContries,
}) => {
	return (
		<div>
			filter shown with{' '}
			<input
				type='text'
				value={searchCountries}
				onChange={handleSearchCountries}
				onKeyDown={handleKeyDownForSearchingContries}
			/>
			<p>Search Result:</p>
			<ul>
				{tooManyFetchedMessage && <p>{tooManyFetchedMessage}</p>}
			</ul>
		</div>
	);
};
export default FindCountries;
