<td><%- firstName %></td>
<td><%- lastName %></td>
<td><%- profileType %></td>
<td><%- email %></td>
<td><%- phoneNumber %></td>
<td>
  <a href="#profile/<%- id %>" class="btn btn-small js-show">
    <i class="icon-eye-open"></i>
    Show
  </a>
  <a href="#profile/<%- id %>/edit" class="btn btn-small js-edit">
    <i class="icon-pencil"></i>
      Edit
  </a>
  <button class="btn btn-small js-delete">
    <i class="icon-remove"></i>
    Delete
  </button>
</td>
