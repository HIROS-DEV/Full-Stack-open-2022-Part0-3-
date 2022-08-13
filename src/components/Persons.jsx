import phoneService from '../services/phonebook';

const Persons = ({
	persons,
	setPersons,
	setErrorMessage,
}) => {
	const handleClick = (person) => {
		const { name, id } = person;
		if (window.confirm(`Delete ${name} ?`)) {
			phoneService.deletePerson(id).catch((err) => {
				setErrorMessage(
					`Information of ${name} has already been removed from the server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
			setPersons(persons.filter((person) => person.id !== id));
		}
	};

	return (
		<ul>
			{persons.map((person) => (
				<li key={person.id}>
					{person.name} {person.number}
					<button onClick={() => handleClick(person)}>delete</button>
				</li>
			))}
		</ul>
	);
};
export default Persons;
