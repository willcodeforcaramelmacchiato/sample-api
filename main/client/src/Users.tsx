import React from 'react';
import {
  Link,
  useParams,
  Outlet
} from "react-router-dom";
import * as PU from "./proto/users";

const rpc = new PU.GrpcWebImpl('http://localhost:8080', { debug: false });
const usersClientImpt = new PU.UsersClientImpl(rpc);

interface NewUser {
  firstName: string,
  lastName: string,
  mobileNumber: string,
  address: string
}

const ListUsers: React.FC = () => {
  const [users, setUsers] = React.useState<Array<PU.User>>([]);
  const callListUsers = () => {
    return usersClientImpt.ListUsers({}).then(res => {
      return res.users;
    })
  };

  React.useEffect(() => {
    callListUsers().then(usersRes => {
      setUsers(usersRes);
    })
  }, []);

  return (
    <div>
      <nav className="list-group">
          {users &&
            users.map((user, index) => (
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/users/${user.id}`}
                key={user.id}
              >
                {user.firstName} {user.lastName}
              </Link>
            ))
          }
        </nav>
        <Outlet />
    </div>
    );
}

const GetUser: React.FC = () => {

  const [user, setUser] = React.useState<PU.User | null >(null);

  let params = useParams();

  const callGetUser = () => {
    return usersClientImpt.ListUsers({}).then(res => {
      return res.users.find(u => u.id.toString() === params.userId);
    })
  };

  React.useEffect(() => {
    callGetUser().then(userRes => {
      console.log('get user?!?!')
      if(userRes) {
        setUser(userRes);
      }
      console.log('setUser');
      console.log(userRes);
    })
  }, []);

  return (<div>
    { user ? (
        <div> { user.firstName } </div>
      ) : (
        <div> None </div>
      )
    }
  </div>);
}

// class CreateUser extends Component {

//   state: NewUser = {
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     address: ''
//   };

//   callCreateUser = () => {
//     const rpc = new PU.GrpcWebImpl('http://localhost:8080', { debug: false });
//     const usersClientImpt = new PU.UsersClientImpl(rpc);

//     const req: PU.CreateUserRequest = this.state;
//     usersClientImpt.CreateUser(req).then(res => {
//       console.log('res'  + res);
//       console.log(res);
//     })
//   }

//   handleSubmit = (event: React.FormEvent) =>  {
//     console.log('state');
//     console.log(this.state);
//     this.callCreateUser();
//     event.preventDefault();
//   }

//   handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const name = event.target.name;

//     console.log('change')
//     console.log(name);

//     console.log(event.target.value);
//     this.setState({
//       [name]: event.target.value
//     });

//   }

//   render() {
//     return(
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           First Name:
//             <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} />
//         </label>

//         <label>
//           Last Name:
//             <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
//         </label>

//         <label>
//           Mobile Number:
//             <input name="mobileNumber" type="text" value={this.state.mobileNumber} onChange={this.handleChange} />
//         </label>

//         <label>
//           Address:
//             <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />
//         </label>

//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export { ListUsers, GetUser };