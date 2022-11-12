<script setup lang="ts">
import { ref } from "vue";
import Draggable from "vuedraggable";

import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";

import type BaseMethod from "./components/ts/BaseMethod";
import ProfileName from "./components/ts/ProfileName";
import ProfileSelfIntroduction from "./components/ts/ProfileSelfIntroduction";
import ProfileBirthday from "./components/ts/ProfileBirthday";
import ProfileGender from "./components/ts/ProfileGender";
import ProfileHobby from "./components/ts/ProfileHobby";

interface Option {
  id: string;
  label: string;
  method: BaseMethod;
  disabled: boolean;
}

const form = ref<Array<any>>([]);
const methods = ref<Array<Option>>([]);
const drag = ref(true);

const options = ref<Array<Option>>([
  {
    id: "setting-nickname",
    label: "ニックネーム設定",
    method: new ProfileName(),
    disabled: false,
  },
  {
    id: "setting-self-introduction",
    label: "自己紹介設定",
    method: new ProfileSelfIntroduction(),
    disabled: false,
  },
  {
    id: "setting-birthday",
    label: "生年月日設定",
    method: new ProfileBirthday(),
    disabled: false,
  },
  {
    id: "setting-gender",
    label: "性別設定",
    method: new ProfileGender(),
    disabled: false,
  },
  {
    id: "setting-hobby",
    label: "趣味設定",
    method: new ProfileHobby(),
    disabled: false,
  },
]);

const onSelectMethod = (method: Option) => {
  const index = options.value.findIndex((value) => value.id === method.id);
  options.value[index].disabled = true;
  methods.value.push(method);
};

const onDeleteMethod = (id: string) => {
  let index = methods.value.findIndex((value) => value.id === id);
  methods.value.splice(index, 1);

  index = options.value.findIndex((value) => value.id === id);
  options.value[index].disabled = false;
};

const onPlaySettings = async () => {
  form.value = [];
  for (let i = 0; i < methods.value.length; i++) {
    await methods.value[i].method.action(form.value).then((value) => {
      form.value = value;
    });
  }

  console.log(form.value);
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />

    <div>
      <button
        v-for="value in options"
        :key="value.id"
        :disabled="value.disabled"
        @click="onSelectMethod(value)"
      >
        {{ value.label }}
      </button>
    </div>
    <ol>
      <Draggable
        v-model="methods"
        group="people"
        item-key="id"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <li>
            {{ element.label }}
            <img
              src="@/assets/cross.svg"
              width="20"
              alt="X"
              style="top: 5px"
              @click="onDeleteMethod(element.id)"
            />
          </li>
        </template>
      </Draggable>
    </ol>
    <button @click="onPlaySettings">スタート</button>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
