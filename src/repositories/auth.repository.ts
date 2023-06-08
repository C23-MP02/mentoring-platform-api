import { auth } from "firebase-admin";
import { firebaseAuth } from "../config/firebase";
import { CustomClaims, FirebaseUpdateData } from "../typings/firebase.type";

export default class AuthRepository {
  /**
   * Creates a new user with the provided name, email, password, and optional phone number.
   *
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} phoneNumber - The phone number of the user (optional).
   * @returns {Promise<auth.UserRecord>} - A promise that resolves with the created user record.
   */
  async createUser(
    name: string,
    email: string,
    password: string,
    phoneNumber?: string
  ): Promise<auth.UserRecord> {
    const userRecord = await firebaseAuth.createUser({
      email,
      password,
      displayName: name,
      phoneNumber,
    });
    return userRecord;
  }

  /**
   * Sets custom claims for a user identified by the UID.
   *
   * @param {string} uid - The UID of the user.
   * @param {CustomClaims} claims - The custom claims to be set for the user.
   * @returns {Promise<void>} - A promise that resolves when the custom claims are successfully set.
   */
  async setRoleClaims(uid: string, claims: CustomClaims): Promise<void> {
    await firebaseAuth.setCustomUserClaims(uid, claims);
  }

  /**
   * Updates a user identified by the UID with the provided data.
   *
   * @param {string} uid - The UID of the user.
   * @param {FirebaseUpdateData} data - The data to update for the user.
   * @returns {Promise<auth.UserRecord>} - A promise that resolves with the updated user record.
   */
  async updateUser(
    uid: string,
    data: FirebaseUpdateData
  ): Promise<auth.UserRecord> {
    const userRecord = await firebaseAuth.updateUser(uid, data);
    return userRecord;
  }

  /**
   * Creates a custom token for a user identified by the UID with the provided custom claims.
   *
   * @param {string} uid - The UID of the user.
   * @param {CustomClaims} claims - The custom claims for the user.
   * @returns {Promise<string>} - A promise that resolves with the created custom token.
   */
  async createCustomToken(uid: string, claims: CustomClaims): Promise<string> {
    const customToken = await firebaseAuth.createCustomToken(uid, claims);
    return customToken;
  }
}
