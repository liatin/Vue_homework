<template>
  <div>
    這是一個卡片元件<br>
    {{ text }}
  </div>
</template>

<script>
export default{
  data() {
    return {
      text: '這是一段文字'
    }
  }
}
</script>
