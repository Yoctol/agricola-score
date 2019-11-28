// form router
function form(path, action) {
  return {
    predicate: context => {
      // not in form
      if (context.state.form == null) {
        return false;
      }

      // other form
      if (context.state.form.path != path) {
        return false;
      }

      // form module just support text input for now.
      if (context.event.isText == false) {
        return false;
      }

      // if not in correct pattern
      if (context.state.form.validateRegex.test(context.event.text)) {
        context.state.form.params[context.state.form.waitingFor] =
          context.event.text;
        context.state.form.waitingFor = null;
      }
      return true;
    },
    action,
  };
}

// form waiting
function prompt(context, { path, param, validateRegex }) {
  context.state.form.inForm = true;
  context.state.form.path = path;
  context.state.form.waitingFor = param;
  context.state.form.validateRegex = validateRegex || /[\s\S]*/;
}

function formMiddleware(context, { next }) {
  // when escape
  if (context.state.form.inForm != true) {
    // reset form
    context.state.form = {
      path: null,
      params: {},
      waitingFor: null,
      validateRegex: /[\s\S]*/,
    };
  }
  context.state.form.inForm = false;
  return next;
}

module.exports = {
  form,
  prompt,
  formMiddleware,
};
