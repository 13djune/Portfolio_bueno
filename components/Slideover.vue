<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton class="info" label="View more" @click="isOpen = true"  icon="i-pixelarticons-bullseye-arrow" />

    <USlideover v-model="isOpen" :overlay="false">
      <UCard
        class="flex flex-col flex-1 slide"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <UButton
         
            color="gray"
            variant="ghost"
            size="sm"
 
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="isOpen = false"
          />

        </template>

   

     
      </UCard>
    </USlideover>
  </div>
</template>
<style scoped>
.info{
    background-color:  #9e99f8;
}
.dark-mode .info{
background-color:  #5229c2;
}
.slide{
    background-color: #f7fdfb;
}
.dark-mode .slide{
    background-color: #020806;
}
</style>
