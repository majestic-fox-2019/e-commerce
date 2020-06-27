<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ msg }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="$emit('OK')"
          flat
          label="OK"
          color="primary"
          v-close-popup
        />
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="$emit('cancel')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Confirm',
  props: ['msg', 'active'],
  data() {
    return {
      confirm: this.active
    }
  }
}
</script>

<style></style>
