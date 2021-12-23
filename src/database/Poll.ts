import { ref } from "vue"
import { db } from "@/firebase"
import { Poll, PollDocument } from "@/types/database"
import { addDoc, getDocs, collection, updateDoc, deleteDoc, CollectionReference, QuerySnapshot } from "firebase/firestore/lite"
import { isEqual } from "lodash-es"

export class PollCollection {
  private static repo = collection(db, "polls") as CollectionReference<Poll>
  static items = ref([] as PollRecord[])
  static loading = ref(false)

  static async fetch(): Promise<any> {
    this.loading.value = true

    const data = await getDocs(this.repo) as QuerySnapshot<Poll>
    this.items.value = data.docs.map(poll => new PollRecord(poll))

    this.loading.value = false
    return this.items
  }

  static async create(attributes: Poll) {
    this.loading.value = true

    await addDoc(this.repo, attributes)
    await this.fetch()

    this.loading.value = false
    return this.items
  }
}

export class PollRecord {
  doc: PollDocument
  docToUpdate: Poll

  constructor(doc: PollDocument) {
    this.doc = doc
    this.docToUpdate = doc.data()
  }

  get id() {
    return this.doc.id
  }

  get userEmail() {
    return this.docToUpdate.user_email
  }

  set userEmail(value: string) {
    this.docToUpdate.user_email = value
  }

  get settings() {
    return this.docToUpdate.settings
  }

  get needSave() {
    return this.doc.get("user_email") !== this.docToUpdate.user_email || !isEqual(this.doc.get("settings"), this.docToUpdate.settings)
  }

  async update() {
    await updateDoc(this.doc.ref, { ...this.docToUpdate, settings: { new: "value" } })

    PollCollection.fetch()
  }

  async destroy() {
    await deleteDoc(this.doc.ref)

    PollCollection.fetch()
  }
}
