const PersonForm = ({
	name,
	number,
	handleName,
	handleNumber,
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input onChange={handleName} value={name} required />
			</div>
			<div>
				number:{' '}
				<input onChange={handleNumber} value={number} required />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};
export default PersonForm;
