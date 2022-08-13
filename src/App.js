import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const [searchName, setSearchName] = useState('');
	const [serachResult, setSearchResult] = useState([]);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleNumber = (e) => {
		setNumber(e.target.value);
	};

	const handleSearch = (e) => {
		setSearchName(e.target.value);
	};

	const handleKeyDown = (e) => {
		const pressEnter = e.keyCode === 13;
		if (pressEnter) {
			const result = persons.filter(
				(person) =>
					person.name.toLowerCase() === searchName.toLowerCase()
			);

			const noMatchedResult = result.length === 0;

			if (noMatchedResult)
				return alert('No matched data in the phonebook');
			setSearchResult(result);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const personObject = { name, number };

		const personExists = persons.some(
			(person) => person.name === name
		);
		const personExistsAlready = persons.find(
			(person) => person.name === name
		);

		if (personExists) {
			const { id, name } = personExistsAlready;
			const message = `${name} is already added to phonebook, replace the old number with a new one ?`;

			if (window.confirm(message)) {
				phoneService
					.update(id, personObject)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : returnedPerson.person
							)
						);
					})
					.catch((error) => {
						const errMsg = `Information of ${name} has already been removed from server`;
						setErrorMessage(errMsg);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					});
			}
		} else {
			phoneService
				.create(personObject)
				.then((returnedPerson) => {
					setSuccessMessage(`Added ${name}`);
					setPersons(persons.concat(returnedPerson.person));
					setTimeout(() => {
						setSuccessMessage(null);
					}, 5000);
				})
				.catch((err) => {
					console.log(err.response.data.error);
					setErrorMessage(err.response.data.error);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
		}
	};

	useEffect(() => {
		phoneService
			.getAll()
			.then((initialPhoneBooks) => {
				setPersons(initialPhoneBooks);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={successMessage} />
			<ErrorNotification message={errorMessage} />
			<Filter
				searchName={searchName}
				serachResult={serachResult}
				handleSearch={handleSearch}
				handleKeyDown={handleKeyDown}
			/>
			<h2>Add a new</h2>
			<PersonForm
				name={name}
				number={number}
				handleName={handleName}
				handleNumber={handleNumber}
				handleSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} setPersons={setPersons} />
		</div>
	);
};
export default App;
