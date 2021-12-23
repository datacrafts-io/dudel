<template>
  <div class="container">
      <div class="loading">
        <Transition name="fade">
          <span v-if="PollCollection.loading.value">
            LOADING
          </span>
        </Transition>
      </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <TransitionGroup name="fade">
      <div
        v-for="poll in polls.value"
        :key="poll.id"
        class="poll"
      >
        <input
          class="user-email"
          type="text"
          v-model="poll.userEmail"
        >
        <button
          type="button"
          :disabled="!poll.needSave"
          :class="{ disabled: !poll.needSave }"
          @click="updatePoll(poll)"
        >UPD</button>
        <button
          type="button"
          class="delete"
          @click="poll.destroy()"
        >DEL</button>
      </div>
    </TransitionGroup>
    <div class="new-user-form">
      <label for="new-user-email">New User Email</label>
      <input
        id="new-user-email"
        placeholder="write user email here"
        type="text"
        v-model="newUserEmail"
      >
      <button type="button" @click="createPoll">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PollCollection, PollRecord } from "@/database/Poll"
  import { ref, reactive } from "vue"

  const newUserEmail = ref("")
  const polls = reactive({ value: [] as PollRecord[] })

  PollCollection.fetch().then(r => polls.value = r)

  const createPoll = async() => {
    await PollCollection.create({ user_email: newUserEmail.value, settings: { a: 1, b: 2 } })
    newUserEmail.value = ""
  }

  const updatePoll = async(poll: PollRecord) => {
    await poll.update()
    newUserEmail.value = ""
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/transitions.sass";

  input {
    margin: 0;
  }

  .container {
    text-align: center;

    .loading {
      height: 30px;
    }
  }

  .new-user-form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 10px;
    background: transparentize($color: #000000, $amount: 0.85);
    margin-top: 15px;

    @media screen and (max-width: 400px) {
      flex-direction: column;
    }
  }

  .poll {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    .user-email {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid transparentize(red, 0.85);
      width: fit-content;

      @media screen and (max-width: 400px) {
        width: 200px;
      }
    }

    .delete {
      background: transparentize(red, 0.3);
    }
  }
</style>
