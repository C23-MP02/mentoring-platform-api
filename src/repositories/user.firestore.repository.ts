import { firestore } from "../config/firebase";

export default class FirestoreRepository {
  protected firestore: FirebaseFirestore.Firestore;

  constructor() {
    this.firestore = firestore;
  }

  /**
   * Retrieves a document by its ID from the specified collection.
   * @param collection - The name of the collection.
   * @param id - The ID of the document.
   * @returns The retrieved document.
   */
  async getDocumentById(collection: string, id: string) {
    const document = await this.firestore.collection(collection).doc(id).get();
    return document;
  }

  /**
   * Creates a document with the specified ID in the specified collection.
   * @param collection - The name of the collection.
   * @param id - The ID of the document.
   * @param data - The data to be set in the document.
   * @returns The created document.
   */
  async createDocument(collection: string, id: string, data: any) {
    const document = await this.firestore
      .collection(collection)
      .doc(id)
      .set(data);
    return document;
  }
}
