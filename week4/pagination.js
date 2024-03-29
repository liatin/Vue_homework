export default {
  props: ['pagination', 'getData'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{
      disabled: !pagination.has_pre
    }">
      <a class="page-link" href="#" aria-label="Previous"
      @click="getData(pagination.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{
      active: page === pagination.current_page
    }" 
    v-for="page in pagination.total_pages" :key="page + 123">
      <a class="page-link" href="#"
      @click="getData(page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{
      disabled: !pagination.has_next
    }">
      <a class="page-link" href="#" aria-label="Next"
      @click="getData(pagination.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};