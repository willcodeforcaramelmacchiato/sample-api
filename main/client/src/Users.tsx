import { stat } from 'fs';
import React from 'react';
import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import { callCancelCourier, callCreateUser, callGetBookings, callGetUser, callListUsers } from './client';
import * as PU from "./proto/users";
import * as PX from "./proto/xpress";
import { bookingStatusToString } from './utils/utils';

const ListUsers: React.FC = () => {
  const [users, setUsers] = React.useState<Array<PU.User>>([]);

  React.useEffect(() => {
    callListUsers().then(usersRes => {
      setUsers(usersRes);
    })
  }, []);

  return (
    <div>
      <nav className="list-group">
          {users &&
            users.map(user => (
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/bookings/${user.id}`}
                key={user.id}
              >
                {user.firstName} {user.lastName}
              </Link>
            ))
          }
        </nav>
    </div>
    );
}

const GetUser: React.FC = () => {
  type State = {
    user: PU.User | null,
    bookings: Array<PX.Booking>
  }

  const [state, setState] = React.useState<State>({ user: null, bookings: [] });

  let params = useParams();

  React.useEffect(() => {
    if(params.userId) {
      const userId = params.userId;
      callGetUser(userId).then(userRes => {
        return callGetBookings(userId).then(bookingRes => {
          if(userRes) {
            setState({...state, ...{ user: userRes, bookings: bookingRes }});
          }
        })
      })
    }
  }, []);

  const onCancelPressed = (id: string) => {
    callCancelCourier(id).then(res => {
      if(res && res.booking) {
        const booking = res.booking;
        const index = state.bookings.findIndex(i => booking.id === i.id)

        const getUpdateBookings = () => {
          if(index > -1) {
            state.bookings[index] = booking;
            return state.bookings;
          } else {
            return state.bookings;
          }
        }

        const updates = { bookings: getUpdateBookings() }

        setState({...state, ...updates})
      }
    })
  }

  const renderBooking = (booking: PX.Booking) => {
    return (
      <div>
        { booking.destination?.fullName } { `->` } { bookingStatusToString(booking.status) }
        <button disabled={ booking.status === PX.BookingStatus.CANCELED } onClick={() => onCancelPressed(booking.id) }>
          Cancel Booking
        </button>
      </div>
    );
  }

  return (<div>
    { state.user ? (
        <div>
          <div>
            Hello { state.user.firstName } { state.user.lastName }!
          </div>
          <div>
            Bookings: { state.bookings.map(b => renderBooking(b)) }
          </div>
          <div>
            <Link to={`/bookings/${state.user.id}/create`}>Create Booking</Link>
          </div>
        </div>
      ) : (
        <div> User not found </div>
      )
    }
  </div>);
}

const CreateUser: React.FC = () => {

  let navigate = useNavigate();

  interface NewUser {
    firstName: string,
    lastName: string,
    mobileNumber: string,
    address: string,
    lat: string,
    lng: string
  }

  interface FormInput {
    displayName: string,
    name: string,
    value: string
  }

  const [ user, setNewUser ] = React.useState<NewUser>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    lat: '',
    lng: ''
  });

  const handleSubmit = (event: React.FormEvent) =>  {
    const lat = parseFloat(user.lat);
    const lng = parseFloat(user.lng);
    if(lat && lng) {
      const req =
        { firstName: user.firstName
        , lastName: user.lastName
        , mobileNumber: user.mobileNumber //check if +63
        , address: user.address
        , lat
        , lng
        }
      callCreateUser(req).then(res => navigate('/users'));
    } else {
      alert('Invalid lat lng');
      const newOnes = { lat: '', lng: '' };
      setNewUser((prevState) => ({ ...prevState, ...newOnes }))
    }
    event.preventDefault();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedUser = { [name]: value } as Pick<NewUser, keyof NewUser>;
    setNewUser({...user, ...updatedUser });
  }

  const createTextInput = (i: FormInput) => {
    return <label key={i.name}>
      { i.displayName }:
      <input name={i.name} type="text" value={i.value} onChange={handleChange} />
    </label>
  }

  const formInputs: Array<FormInput> =
    [ { displayName: 'First Name', name: 'firstName', value: user.firstName }
    , { displayName: 'Last Name', name: 'lastName', value: user.lastName }
    , { displayName: 'Mobile Number', name: 'mobileNumber', value: user.mobileNumber }
    , { displayName: 'Address', name: 'address', value: user.address }
    , { displayName: 'Lat', name: 'lat', value: user.lat }
    , { displayName: 'Lng', name: 'lng', value: user.lng }
    ]

  return(
    <form onSubmit={ handleSubmit }>
      { formInputs.map(i => createTextInput(i)) }
      <input type="submit" value="Submit" />
    </form>
  );
}

export { ListUsers, CreateUser, GetUser };