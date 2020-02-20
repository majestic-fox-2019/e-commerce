<template>
    <div>
        <div class="card">
          <img class="card-img-top" src ="https://cdn.bike24.net/i/p/0/0/298700_00_d.jpg" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title
              and make up the bulk of the card's content.
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price : 100000</li>
            <li class="list-group-item">Stock : 10</li>
            <li class="list-group-item">img : url </li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">delete</a>
            <a href="#" class="card-link">edit</a>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'cardproduct',
  props: ['datadetail'],
};
</script>

<style>

</style>
