<script setup lang="ts">
import { ref } from "vue";
import Draggable from "vuedraggable";

import type BaseAction from "./components/ts/BaseAction";
import ProfileName from "./components/ts/ProfileName";
import ProfileSelfIntroduction from "./components/ts/ProfileSelfIntroduction";
import ProfileBirthday from "./components/ts/ProfileBirthday";
import ProfileGender from "./components/ts/ProfileGender";
import ProfileHobby from "./components/ts/ProfileHobby";
import ProfilePreview from "./components/ts/ProfilePreview";

interface Option {
  id: string;
  label: string;
  action: BaseAction;
  disabled: boolean;
}

const form = ref<Array<any>>([]);
const actions = ref<Array<Option>>([]);
const drag = ref(true);

const options = ref<Array<Option>>([
  {
    id: "setting-nickname",
    label: "ニックネーム設定",
    action: new ProfileName(),
    disabled: false,
  },
  {
    id: "setting-self-introduction",
    label: "自己紹介設定",
    action: new ProfileSelfIntroduction(),
    disabled: false,
  },
  {
    id: "setting-birthday",
    label: "生年月日設定",
    action: new ProfileBirthday(),
    disabled: false,
  },
  {
    id: "setting-gender",
    label: "性別設定",
    action: new ProfileGender(),
    disabled: false,
  },
  {
    id: "setting-hobby",
    label: "趣味設定",
    action: new ProfileHobby(),
    disabled: false,
  },
  {
    id: "setting-preview",
    label: "プレビュー",
    action: new ProfilePreview(),
    disabled: false,
  },
]);

const onSelectaction = (action: Option) => {
  const index = options.value.findIndex((value) => value.id === action.id);
  if (action.id !== "setting-preview") {
    options.value[index].disabled = true;
  }
  actions.value.push(action);
};

const onDeleteaction = (id: string) => {
  let index = actions.value.findIndex((value) => value.id === id);
  actions.value.splice(index, 1);

  index = options.value.findIndex((value) => value.id === id);
  options.value[index].disabled = false;
};

const onPlaySettings = async () => {
  form.value = [];
  for (let i = 0; i < actions.value.length; i++) {
    await actions.value[i].action.action(form.value).then((value) => {
      form.value = value;
    });
  }
};
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="greetings">
        <h1 class="green">Vue profile setting</h1>
      </div>
    </div>
  </header>

  <main>
    <div>
      <button
        v-for="value in options"
        :key="value.id"
        class="css-button-sliding-to-left--green"
        :disabled="value.disabled"
        @click="onSelectaction(value)"
      >
        {{ value.label }}
      </button>
    </div>
    <ol>
      <Draggable
        v-model="actions"
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
              @click="onDeleteaction(element.id)"
            />
          </li>
        </template>
      </Draggable>
    </ol>
    <button class="css-button-sliding-to-left--green" @click="onPlaySettings">
      スタート
    </button>
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

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

/* List CSS */
ul,
ol {
  color: hsla(160, 100%, 37%, 1);
  border-top: solid hsla(160, 100%, 37%, 1) 1px; /*上のボーダー*/
  border-bottom: solid hsla(160, 100%, 37%, 1) 1px; /*下のボーダー*/
  margin: 10px 0;
  padding: 0.5em 0 0.5em 1.5em;
}

ul li,
ol li {
  line-height: 1.5;
  padding: 0.5em 0;
}

/* Button CSS */
.css-button-sliding-to-left--green {
  min-width: 130px;
  height: 40px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff0;
  overflow: hidden;
  border: 2px solid hsla(160, 100%, 37%, 1);
  color: hsla(160, 100%, 37%, 1);
}
.css-button-sliding-to-left--green:hover {
  color: #181818;
}
.css-button-sliding-to-left--green:hover:after {
  width: 100%;
}
.css-button-sliding-to-left--green:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: hsla(160, 100%, 37%, 1);
}
</style>
