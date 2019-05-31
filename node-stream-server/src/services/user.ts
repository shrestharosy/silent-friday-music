import User from "../models/user";

export interface IUser {
  _id?: string;
  userId: string;
  name: string;
  email: string;
  image: string;
  // accessToken?: string;
  refreshToken?: Array<string>;
}

export async function getAllUsers() {
  try {
    const userList = await new Promise<Array<IUser>>((resolve, reject) => {
      User.find((error: Object, response: Array<IUser>) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    return userList;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const userData = await new Promise<IUser>((resolve, reject) => {
      User.findById(id, (error: Object, response: IUser) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    return userData;
  } catch (error) {
    throw error;
  }
}

export async function getUserByGoogleId(id: string) {
  try {
    const userData = await new Promise<IUser>((resolve, reject) => {
      User.findOne({ userId: id }, (error: Object, response: IUser) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    return userData;
  } catch (error) {
    throw error;
  }
}

export async function createUser(user: IUser) {
  try {
    const createUser = await new Promise<IUser>((resolve, reject) => {
      const newUser = new User(user);
      newUser.save((error: Object, user: IUser) => {
        if(error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    })
    return createUser;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id: string , updatedUserData: IUser) {
  try { 
    const updateUser = await new Promise<IUser>((resolve, reject) => {
      User.findOneAndUpdate({ _id: id }, updatedUserData, (error: Object, user: IUser | null, response: IUser) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
    return updateUser;
  } catch (error) {
    throw error;
  }
}

// TODO: remaning functions
// - Update refresh token
// - Remove User Session
// - Search User by name
