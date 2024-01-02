

const Users = ({ user }) => {
    return (

        <tr>
            <th scope='row'>1</th>
            <td>{user.name}</td>
            <td>{user.UserName}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
        </tr>

    )
}

export default Users;