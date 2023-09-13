import { DocumentData, DocumentReference, getDoc } from '@firebase/firestore';

export const getMangas = async (docRef: DocumentReference<DocumentData, DocumentData>) =>
  getDoc(docRef).then();
