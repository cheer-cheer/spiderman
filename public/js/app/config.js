define(['jquery'], function ($) {
  'use strict'

  function main() {
    setupGeneralPanel()
  }

  function setupGeneralPanel() {
    var
      ORIGINAL_VALUE_DATA_KEY = 'originalValue',
      $name = $('#txt-name'),
      $desc = $('#txt-desc'),
      $editButton = $('#btn-g-edit'),
      $saveButton = $('#btn-g-save'),
      $cancelButton = $('#btn-g-cancel')

    $editButton.click(function (e) {
      $saveButton.removeClass('hidden')
      $cancelButton.removeClass('hidden')
      $editButton.addClass('hidden')

      $name.attr('readonly', false).data(ORIGINAL_VALUE_DATA_KEY, $name
        .val())
      $desc.attr('readonly', false).data(ORIGINAL_VALUE_DATA_KEY, $desc
        .val())
      $name.focus()
    })

    $cancelButton.click(function (e) {
      $saveButton.addClass('hidden')
      $cancelButton.addClass('hidden')
      $editButton.removeClass('hidden')

      $name.attr('readonly', true).val($name.data(
        ORIGINAL_VALUE_DATA_KEY))
      $desc.attr('readonly', true).val($desc.data(
        ORIGINAL_VALUE_DATA_KEY))
    })
  }

  return {
    main: main
  }
})
