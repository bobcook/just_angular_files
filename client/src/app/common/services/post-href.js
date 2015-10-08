// For creating and submitting one-off forms with arbitrary
// data, i.e. synchronous POST.
//
// For directive version, see ss-post-href
const $postHref = function () {
  const makeInput = function (value, name) {
    return $('<input type="hidden">').attr('name', name).attr('value', value);
  };

  return function (url, data) {
    const inputs = _.map(data, makeInput);
    const form = $('<form>', {
      method: 'POST',
      action: url,
      html: inputs,
    });
    form.appendTo(document.body).submit();
  };
};

export default $postHref;
