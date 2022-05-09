import * as PU from "./proto/users";
import * as PX from "./proto/xpress";

const usersRpc = new PU.GrpcWebImpl('http://localhost:8080', { debug: false });
const usersClientImpl = new PU.UsersClientImpl(usersRpc);
const xpressRpc = new PX.GrpcWebImpl('http://localhost:8080', { debug: false });
const xpressClientImpl = new PX.XpressClientImpl(xpressRpc);

const callListUsers = () => {
  return usersClientImpl.ListUsers({}).then(res => {
    return res.users;
  });
};

const callGetUser = (userId: string) => {
  return usersClientImpl.ListUsers({}).then(res => {
    return res.users.find(u => u.id.toString() === userId);
  });
};

const callCreateUser = (req: PU.CreateUserRequest) => {
  return usersClientImpl.CreateUser(req);
}

const callGetBookings = () => {
  return xpressClientImpl.ListBookings({}).then(res => {
    return res.bookings;
  });
};

const callGetAvailableCouriers = (req: PX.GetAvailableCouriersRequest) => {
  return xpressClientImpl.GetAvailableCouriers(req);
}

const callGetBooking = (id: string) => {
  return xpressClientImpl.ListBookings({}).then(res => {
    return res.bookings.find(u => u.id === id);
  });
};

const callBookCourier = (id: string) => {
  return xpressClientImpl.BookCourier({ id }).then(res => {
    return res.success;
  })
}

export {
  callListUsers,
  callGetUser,
  callGetBookings,
  callGetBooking,
  callCreateUser,
  callGetAvailableCouriers,
  callBookCourier
}