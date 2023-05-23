import { auth } from "firebase-admin";
import { firebaseAuth } from "../config/firebase";
import { FirebaseUpdateData } from "../typings/firebase.type";

export default class AuthRepository {
  async createUser(
    uid: string,
    name: string,
    email: string,
    password: string,
    phoneNumber?: string
  ): Promise<auth.UserRecord> {
    const userRecord = await firebaseAuth.createUser({
      uid,
      email,
      password,
      displayName: name,
      phoneNumber,
    });
    return userRecord;
  }

  async setRoleClaims(uid: string, claims: { role: string }): Promise<void> {
    await firebaseAuth.setCustomUserClaims(uid, claims);
  }

  async updateUser(
    uid: string,
    data: FirebaseUpdateData
  ): Promise<auth.UserRecord> {
    const userRecord = await firebaseAuth.updateUser(uid, data);
    return userRecord;
  }
}
