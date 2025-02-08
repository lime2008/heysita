<template>
  <div class="border_dot"></div>
  <div class="comment-form" style="margin-top: 55px">
    <div style="display: flex">
      <heysita_input
        :max-chars="20"
        v-model="newComment.nick"
        placeholder="输入昵称..."
        :disabled="false"
        style="flex: 35%; margin-right: 10px"
      />
      <heysita_input
        :max-chars="50"
        v-model="newComment.email"
        placeholder="输入邮箱..."
        :disabled="false"
        style="flex: 65%"
      />
    </div>
    <heysita_input
      :max-chars="80"
      v-model="newComment.profile"
      placeholder="输入网址(选填)..."
      :disabled="false"
      style="margin-top: 5px"
    />
    <heysita_input
      :max-chars="180"
      v-model="newComment.content"
      :isTextarea="true"
      placeholder="客官看后有什么想法吗，来聊两句吧~"
      :disabled="false"
      style="margin-top: 5px"
    />
    <heysita_button
      @click="submitComment"
      type="plain"
      style="width: 100%; margin-top: 5px"
      :disabled="isDisabled"
      >投递</heysita_button
    >
  </div>
  <div v-if="comments.length === 0">
    <div class="comments">
      <div class="comment">
        <div
          class="comment_avatar"
          :style="{ backgroundImage: 'url(https://q2.qlogo.cn/headimg_dl?dst_uin=3463448740&spec=5)' }"
        ></div>
        <div class="comment_container">
          <div class="comment_nick">
            <h3 style="font-weight: bold; color: #000000">柠</h3>
          </div>
          <div class="comment_content">这里还没有评论欸！</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="comments">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="comment"
      @click="handleClick(comment.profile)"
    >
      <div
        class="comment_avatar"
        :style="{ backgroundImage: 'url(' + comment.avatar + ')' }"
      ></div>
      <div class="comment_container">
        <div class="comment_nick">
          <h3 style="font-weight: bold; color: #000000">{{ comment.nick }}</h3>
          <p style="margin-left: 7.5px; font-size: 12px">
            {{ formatTimestamp(comment.timestamp) }}
          </p>
        </div>
        <div class="comment_content" v-html="comment.content"></div>
      </div>
    </div>

    <heysita_pagination
      :total="totalPage*10"
      :pager-count="perPage"
      v-model:current-page="currentPage"
      layout="prev, pager, next"
      style="margin-top: 15px"
      @current-change="loadComment"
    />
  </div>
</template>

<script setup>
  import { reactive, ref } from "vue";
  import heysita_pagination from "./pagination.vue";
  import heysita_input from "./input.vue";
  import heysita_button from "./button.vue";
  import { defineProps, defineEmits, computed } from "vue";
  import heysita_message from "~/utils/generateMessage";
  import { formatTimestamp } from "~/utils/transferTime";
  const isDisabled = ref(false);
  const props = defineProps({
    api: String,
    pid: String,
  });
  const comments = ref([]);
  const newComment = reactive({
    nick: "",
    email: "",
    profile: "",
    content: "",
  });
  const totalPage = ref(1);
  const currentPage = ref(1);
  const perPage = ref(5);

  const loadComment = (page = 1) => {
    fetch(`${props.api}/msg/${props.pid}/${page}`).then(async (response) => {
      if (response.ok) {
        let data = await response.json();
        if (!data.status)
          heysita_message({
            message: data.reason,
            type: "error",
            duration: 2500,
          });
        else {
          currentPage.value = page;
          totalPage.value = data.totalPages;
          console.log(data);
          data.data = data.data.map((item) => ({
            ...item,
            content: item.content
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br>"),
          }));
          comments.value = [...data.data];
          //.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, "<br>")
        }
      } else {
        console.error("Error posting comment:", response.status);
      }
    });
  };
  const handleClick = (url) => {
    if (url !== "") window.open(url, "_blank");
  };

  onMounted(() => {
    loadComment();
  });
  const submitComment = () => {
    isDisabled.value = true;
    if (
      newComment.content.length == 0 ||
      newComment.email.length == 0 ||
      newComment.nick.length == 0
    ) {
      heysita_message({
        message: "信息还没有填满哦",
        type: "warning",
        duration: 1000,
      });
      setTimeout(() => {
        isDisabled.value = false;
      }, 250);
      return;
    }
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(newComment.email)) {
      heysita_message({
        message: "邮件格式貌似不正确",
        type: "warning",
        duration: 2000,
      });
      setTimeout(() => {
        isDisabled.value = false;
      }, 250);
      return;
    }
    fetch(`${props.api}/msg/way_to_add_routes/1`);
    fetch(`${props.api}/insert/${props.pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then(async (response) => {
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          if (!data.status)
            heysita_message({
              message: data.reason,
              type: "error",
              duration: 2500,
            });
          else {
            newComment.content = "";
            loadComment();
            heysita_message({
              message: "评论成功啦",
              type: "success",
              duration: 2500,
            });
          }
        } else {
          console.error("Error posting comment:", response.status);
        }
      })
      .catch((error) => {
        heysita_message({ message: error, type: "error", duration: 10000 });
        console.error("Error posting comment:", error);
      })
      .finally(() => {
        setTimeout(() => {
          isDisabled.value = false;
        }, 250);
      });
  };
</script>

<style>
  .border_dot {
    margin-top: 25px;
    position: relative;
  }
  .border_dot::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: linear-gradient(
      to right,
      #666 47.5%,
      transparent 47.5%,
      transparent 52.5%,
      #666 52.5%,
      #666 100%
    );
  }
  .border_dot::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 50%;
  }

  .comments {
    margin-top: 25px;
  }
  .comment:nth-child(1) {
    margin-top: 0;
  }
  .comment_container {
    width: calc(100% - 65px);
  }
  .comment {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 12.5px 20px;
    background-color: #ffffff;
    margin-top: 15px;
  }
  .comment_nick {
    display: flex;
    align-items: center;
  }
  .comment_avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
