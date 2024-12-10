<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton label="More info" @click="isOpen = true" />

    <USlideover v-model="isOpen" :overlay="false">
      <UCard
        class="flex flex-col flex-1"
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

