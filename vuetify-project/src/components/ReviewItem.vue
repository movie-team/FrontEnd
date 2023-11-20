<template>
  <div>
    <div class="review-head">
      <v-rating
        half-increments
        hover
        readonly
        :length="5"
        :size="32"
        :model-value="review.rating/2"
        color="primary"
        active-color="primary"
      />&nbsp;&nbsp;
      <span><strong>{{ review.rating }}</strong></span>
    </div>
    <p>{{ review.content }}</p>
    <p>{{ review.user }}</p>
    <img class="like" @click="likeClick" width="30" height="30" src="https://img.icons8.com/external-thin-kawalan-studio/48/external-thumb-up-shipping-delivery-thin-kawalan-studio.png" alt="external-thumb-up-shipping-delivery-thin-kawalan-studio"/>
    <img class="like" @click="hateClick" width="24" height="24" src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/external-thumbs-down-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png" alt="external-thumbs-down-interface-royyan-wijaya-detailed-outline-royyan-wijaya"/>
  </div>
  <hr>
</template>

<script setup>
defineProps({
  review: Object
})

const likeClick = () => {
  console.log('좋아요 클릭!')
}

const hateClick = () => {
  console.log('싫어요 클릭!')
}
</script>

<style scoped>
.review-head {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.like:hover {
  cursor: pointer;
}
</style>