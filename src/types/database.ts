import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore/lite"

export interface Poll extends DocumentData {
  user_email: string, settings: string | Record<string, any>
}
export type PollDocument = QueryDocumentSnapshot<Poll>
