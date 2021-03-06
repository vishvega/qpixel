$(() => {
  const editField = $('<input type="number" class="form-control js-privilege-edit" />');

  $('.js-privilege-threshold').on('click', async evt => {
    const $tgt = $(evt.target);

    if ($tgt.hasClass('editing') || !$tgt.is('td')) {
      return;
    }

    const name = $tgt.data('name');

    const resp = await fetch(`/admin/privileges/${name}`, {
      credentials: 'include'
    });
    const data = await resp.json();
    const value = data.threshold;

    const form = editField.clone().val(value.toString()).attr('data-name', name);
    $tgt.addClass('editing').html(form).append(`<button class="btn btn-primary js-privilege-submit">Update</button>`);
  });

  $(document).on('click', '.js-privilege-submit', async evt => {
    const $tgt = $(evt.target);
    const $td = $tgt.parent();
    const $input = $td.find('.js-privilege-edit');
    const name = $input.data('name');
    const value = $input.val();

    const resp = await fetch(`/admin/privileges/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': QPixel.csrfToken() },
      body: JSON.stringify({threshold: value})
    });
    const data = await resp.json();

    $td.removeClass('editing').html('').text(data.privilege.threshold.toString());
  });
});