<script setup lang="ts">
import { ref } from "vue";
import UUID from "uuidjs";
import Draggable from "vuedraggable";

import type Option from "./types/Option";
import type Action from "./types/Action";

import ProfileName from "./components/ts/ProfileName";
import ProfileSelfIntroduction from "./components/ts/ProfileSelfIntroduction";
import ProfileBirthday from "./components/ts/ProfileBirthday";
import ProfileGender from "./components/ts/ProfileGender";
import ProfileHobby from "./components/ts/ProfileHobby";
import ProfilePreview from "./components/ts/ProfilePreview";

// 設定したプロフィール内容の保存用
const form = ref<Array<any>>([]);
// 表示する設定モーダルリスト
const actions = ref<Array<Action>>([]);
// プロフィール設定の選択肢
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

// 選択したプロフィール設定をリストに追加する
const onSelectAction = (action: Option): void => {
  const index = options.value.findIndex((value) => value.id === action.id);
  if (action.id !== "setting-preview") {
    options.value[index].disabled = true;
  }
  actions.value.push({ key: UUID.generate(), ...action });
};

// 選択したプロフィール設定をリストから削除する
const onDeleteAction = (key: string): void => {
  let index = actions.value.findIndex((value) => value.key === key);
  let deleted = actions.value.splice(index, 1);
  let id = deleted[0].id;

  index = options.value.findIndex((value) => value.id === id);
  options.value[index].disabled = false;
};

// 選択したプロフィール設定のリストを順次実行する
const onPlaySettings = async (): Promise<any> => {
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
    <div class="profile-setting">
      <div class="action-buttons">
        <button
          v-for="value in options"
          :key="value.id"
          :class="{ disabled: value.disabled }"
          class="button_line004"
          :disabled="value.disabled"
          @click="onSelectAction(value)"
        >
          <span> {{ value.label }}</span>
        </button>
        <button
          :class="{ disabled: actions.length < 1 }"
          class="button_line004 start-button"
          :disabled="actions.length < 1"
          @click="onPlaySettings"
        >
          <span>スタート</span>
        </button>
      </div>

      <div>
        <ol>
          <Draggable v-model="actions" group="people" item-key="key">
            <template #item="{ element }">
              <li>
                {{ element.label }}
                <img
                  class="closs-icon"
                  src="@/assets/cross.svg"
                  width="20"
                  alt="X"
                  @click="onDeleteAction(element.key)"
                />
              </li>
            </template>
          </Draggable>
        </ol>
      </div>
    </div>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
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

.profile-setting {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.profile-setting .action-buttons {
  display: inline-grid;
}

.profile-setting .start-button {
  margin-top: 100px;
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

.closs-icon {
  top: 5px;
  float: right;
}

/* Button CSS */
.button_line004 {
  border: none;
  background-color: #fff0;

  margin: 10px;

  cursor: pointer;
}
.button_line004 span {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  max-width: 200px;
  padding: 10px 25px;
  color: hsla(160, 100%, 37%, 1);
  background-color: fff0;
  transition: 0.3s ease-in-out;
  font-weight: 600;
}

.button_line004.disabled {
  cursor: unset;
}
.button_line004.disabled span,
.button_line004.disabled span:hover {
  color: hsl(160deg 10% 20%);
  background-color: #fff0;
}
.button_line004.disabled span:before,
.button_line004.disabled span:hover:before,
.button_line004.disabled span:after,
.button_line004.disabled span:hover:after {
  border-color: hsl(160deg 10% 20%);
}

.button_line004 span:before,
.button_line004 span:after {
  content: "";
  width: 18px;
  height: 18px;
  border-color: hsla(160, 100%, 37%, 1);
  box-sizing: border-box;
  border-style: solid;
  display: block;
  position: absolute;
  transition: all 0.3s ease-in-out;
}
.button_line004 span:before {
  top: -6px;
  left: -6px;
  border-width: 2px 0 0 2px;
  z-index: 5;
}
.button_line004 span:after {
  bottom: -6px;
  right: -6px;
  border-width: 0 2px 2px 0;
}
.button_line004 span:hover:before,
.button_line004 span:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: hsla(160, 100%, 37%, 1);
}
.button_line004 span:hover {
  color: #313131;
  background-color: hsla(160, 100%, 37%, 1);
  border-color: hsla(160, 100%, 37%, 1);
}
</style>
