SS.ReminderSettings.controller 'FormController', ->
  @reminders = undefined

  # must use string booleans because Rails forms return string booleans
  @setReminders = (existing_setting, has_reminders) ->
    if existing_setting
      @reminders ||= has_reminders.toString()
    else
      @reminders ||= true.toString()

  @shouldShow = ->
    @reminders == 'true'

  @
