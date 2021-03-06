/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import { Empty } from "./google/protobuf/empty";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  birthday?: Date;
  lat: number;
  lng: number;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  birthday?: Date;
  lat: number;
  lng: number;
}

export interface CreateUserResponse {
  user?: User;
}

export interface ListUsersResponse {
  users: User[];
}

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  user?: User;
}

function createBaseUser(): User {
  return {
    id: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    birthday: undefined,
    lat: 0,
    lng: 0,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.firstName !== "") {
      writer.uint32(18).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(26).string(message.lastName);
    }
    if (message.mobileNumber !== "") {
      writer.uint32(34).string(message.mobileNumber);
    }
    if (message.address !== "") {
      writer.uint32(42).string(message.address);
    }
    if (message.birthday !== undefined) {
      Timestamp.encode(
        toTimestamp(message.birthday),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.lat !== 0) {
      writer.uint32(57).double(message.lat);
    }
    if (message.lng !== 0) {
      writer.uint32(65).double(message.lng);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.firstName = reader.string();
          break;
        case 3:
          message.lastName = reader.string();
          break;
        case 4:
          message.mobileNumber = reader.string();
          break;
        case 5:
          message.address = reader.string();
          break;
        case 6:
          message.birthday = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.lat = reader.double();
          break;
        case 8:
          message.lng = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      mobileNumber: isSet(object.mobileNumber)
        ? String(object.mobileNumber)
        : "",
      address: isSet(object.address) ? String(object.address) : "",
      birthday: isSet(object.birthday)
        ? fromJsonTimestamp(object.birthday)
        : undefined,
      lat: isSet(object.lat) ? Number(object.lat) : 0,
      lng: isSet(object.lng) ? Number(object.lng) : 0,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.firstName !== undefined && (obj.firstName = message.firstName);
    message.lastName !== undefined && (obj.lastName = message.lastName);
    message.mobileNumber !== undefined &&
      (obj.mobileNumber = message.mobileNumber);
    message.address !== undefined && (obj.address = message.address);
    message.birthday !== undefined &&
      (obj.birthday = message.birthday.toISOString());
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.mobileNumber = object.mobileNumber ?? "";
    message.address = object.address ?? "";
    message.birthday = object.birthday ?? undefined;
    message.lat = object.lat ?? 0;
    message.lng = object.lng ?? 0;
    return message;
  },
};

function createBaseCreateUserRequest(): CreateUserRequest {
  return {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    birthday: undefined,
    lat: 0,
    lng: 0,
  };
}

export const CreateUserRequest = {
  encode(
    message: CreateUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.mobileNumber !== "") {
      writer.uint32(26).string(message.mobileNumber);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    if (message.birthday !== undefined) {
      Timestamp.encode(
        toTimestamp(message.birthday),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.lat !== 0) {
      writer.uint32(49).double(message.lat);
    }
    if (message.lng !== 0) {
      writer.uint32(57).double(message.lng);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.firstName = reader.string();
          break;
        case 2:
          message.lastName = reader.string();
          break;
        case 3:
          message.mobileNumber = reader.string();
          break;
        case 4:
          message.address = reader.string();
          break;
        case 5:
          message.birthday = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.lat = reader.double();
          break;
        case 7:
          message.lng = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      mobileNumber: isSet(object.mobileNumber)
        ? String(object.mobileNumber)
        : "",
      address: isSet(object.address) ? String(object.address) : "",
      birthday: isSet(object.birthday)
        ? fromJsonTimestamp(object.birthday)
        : undefined,
      lat: isSet(object.lat) ? Number(object.lat) : 0,
      lng: isSet(object.lng) ? Number(object.lng) : 0,
    };
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    message.firstName !== undefined && (obj.firstName = message.firstName);
    message.lastName !== undefined && (obj.lastName = message.lastName);
    message.mobileNumber !== undefined &&
      (obj.mobileNumber = message.mobileNumber);
    message.address !== undefined && (obj.address = message.address);
    message.birthday !== undefined &&
      (obj.birthday = message.birthday.toISOString());
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateUserRequest>, I>>(
    object: I
  ): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.mobileNumber = object.mobileNumber ?? "";
    message.address = object.address ?? "";
    message.birthday = object.birthday ?? undefined;
    message.lat = object.lat ?? 0;
    message.lng = object.lng ?? 0;
    return message;
  },
};

function createBaseCreateUserResponse(): CreateUserResponse {
  return { user: undefined };
}

export const CreateUserResponse = {
  encode(
    message: CreateUserResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUserResponse {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: CreateUserResponse): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateUserResponse>, I>>(
    object: I
  ): CreateUserResponse {
    const message = createBaseCreateUserResponse();
    message.user =
      object.user !== undefined && object.user !== null
        ? User.fromPartial(object.user)
        : undefined;
    return message;
  },
};

function createBaseListUsersResponse(): ListUsersResponse {
  return { users: [] };
}

export const ListUsersResponse = {
  encode(
    message: ListUsersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListUsersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(User.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUsersResponse {
    return {
      users: Array.isArray(object?.users)
        ? object.users.map((e: any) => User.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListUsersResponse): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListUsersResponse>, I>>(
    object: I
  ): ListUsersResponse {
    const message = createBaseListUsersResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetUserRequest(): GetUserRequest {
  return { id: "" };
}

export const GetUserRequest = {
  encode(
    message: GetUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: GetUserRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserRequest>, I>>(
    object: I
  ): GetUserRequest {
    const message = createBaseGetUserRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetUserResponse(): GetUserResponse {
  return { user: undefined };
}

export const GetUserResponse = {
  encode(
    message: GetUserResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserResponse {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: GetUserResponse): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserResponse>, I>>(
    object: I
  ): GetUserResponse {
    const message = createBaseGetUserResponse();
    message.user =
      object.user !== undefined && object.user !== null
        ? User.fromPartial(object.user)
        : undefined;
    return message;
  },
};

export type UsersService = typeof UsersService;
export const UsersService = {
  createUser: {
    path: "/Users/CreateUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateUserRequest) =>
      Buffer.from(CreateUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateUserRequest.decode(value),
    responseSerialize: (value: CreateUserResponse) =>
      Buffer.from(CreateUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateUserResponse.decode(value),
  },
  listUsers: {
    path: "/Users/ListUsers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) =>
      Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: ListUsersResponse) =>
      Buffer.from(ListUsersResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListUsersResponse.decode(value),
  },
  getUser: {
    path: "/Users/GetUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetUserRequest) =>
      Buffer.from(GetUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetUserRequest.decode(value),
    responseSerialize: (value: GetUserResponse) =>
      Buffer.from(GetUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetUserResponse.decode(value),
  },
} as const;

export interface UsersServer extends UntypedServiceImplementation {
  createUser: handleUnaryCall<CreateUserRequest, CreateUserResponse>;
  listUsers: handleUnaryCall<Empty, ListUsersResponse>;
  getUser: handleUnaryCall<GetUserRequest, GetUserResponse>;
}

export interface UsersClient extends Client {
  createUser(
    request: CreateUserRequest,
    callback: (error: ServiceError | null, response: CreateUserResponse) => void
  ): ClientUnaryCall;
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateUserResponse) => void
  ): ClientUnaryCall;
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateUserResponse) => void
  ): ClientUnaryCall;
  listUsers(
    request: Empty,
    callback: (error: ServiceError | null, response: ListUsersResponse) => void
  ): ClientUnaryCall;
  listUsers(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListUsersResponse) => void
  ): ClientUnaryCall;
  listUsers(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListUsersResponse) => void
  ): ClientUnaryCall;
  getUser(
    request: GetUserRequest,
    callback: (error: ServiceError | null, response: GetUserResponse) => void
  ): ClientUnaryCall;
  getUser(
    request: GetUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetUserResponse) => void
  ): ClientUnaryCall;
  getUser(
    request: GetUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetUserResponse) => void
  ): ClientUnaryCall;
}

export const UsersClient = makeGenericClientConstructor(
  UsersService,
  "Users"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): UsersClient;
  service: typeof UsersService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
