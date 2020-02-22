<template>
  <div>
    <Modal type="Add Category"></Modal>
    <CardCategory class="pt-4 px-5" ></CardCategory>
  </div>
</template>

<script>
import CardCategory from './CardCategory.vue';
import Modal from './ModalCategory.vue';

export default {
  components: {
    CardCategory,
    Modal,
  },
  data() {
    return {
      alignmentsAvailable: [
        'start',
        'center',
        'end',
        'baseline',
        'stretch',
      ],
      alignment: 'center',
      dense: false,
      justifyAvailable: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
      ],
      justify: 'center',
    };
  },
};
</script>
