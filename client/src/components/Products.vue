<template>
  <div>
    <Modal :category="category" type="Add Product" class="pb-2">
    </Modal>
    <CardProduct
    :category="category"
    class="pt-4 px-5"
    ></CardProduct>
  </div>
</template>

<script>
import CardProduct from './CardProduct.vue';
import Modal from './ModalProduct.vue';

export default {
  components: {
    CardProduct,
    Modal,
  },
  props: ['category'],
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
