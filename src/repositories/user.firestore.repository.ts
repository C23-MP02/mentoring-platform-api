import { firestore } from "../config/firebase";

export class FirestoreRepository {
  protected firestore: FirebaseFirestore.Firestore;

  constructor() {
    this.firestore = firestore;
  }

  async getDocumentById(collection: string, id: string) {
    const document = await this.firestore.collection(collection).doc(id).get();
    return document;
  }

  async createDocument(collection: string, id: string, data: any) {
    const document = await this.firestore
      .collection(collection)
      .doc(id)
      .set(data);
    return document;
  }
}
