import React, { useEffect, useState } from 'react';
import Users from '../components/users';

const Home = () => {
	const [users, setUsers] = useState('');

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch('/api/user');
			const json = await response.json();
			if (response.ok) {
				setUsers(json.users);
				console.log(json.users);
			}
		};
		fetchUsers();
	}, []);

	return (
		<div className="Home">
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">UserName</th>
						<th scope="col">Email</th>
						<th scope="col">Mobile</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) =>
							<Users key={user._id} user={user} />)}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
