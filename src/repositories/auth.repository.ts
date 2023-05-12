import { auth } from "firebase-admin";

export class AuthRepository {
  async createUser(
    email: string,
    password: string,
    name: string,
    phone: string
  ): Promise<auth.UserRecord> {
    const userRecord = await auth().createUser({
      email,
      password,
      displayName: name,
      phoneNumber: phone,
    });
    return userRecord;
  }

  async setRoleClaims(uid: string, claims: { role: string }): Promise<void> {
    await auth().setCustomUserClaims(uid, claims);
  }
}
