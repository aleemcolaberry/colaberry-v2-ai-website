/* ============================================================
   Colaberry Design System — runtime bundle (namespace: ColaberryDesignSystem_098454)
   Plain-JS build of the core components used by the AI Systems Architect
   Accelerator home page (Button, Input, Avatar). Loaded as a normal <script>
   after the React UMD globals, so it uses React.createElement directly (no JSX).
   Each component injects its own scoped CSS once on first use, exactly like the
   source components in components/core/*.jsx.
   ============================================================ */
(function () {
  var React = window.React;
  var h = React.createElement;

  function injectCSS(id, css) {
    if (typeof document === 'undefined') return;
    if (document.getElementById(id)) return;
    var s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------------
     BUTTON
     --------------------------------------------------------------- */
  var BTN_CSS = `
.cb-btn {
  --_bg: var(--action-bg);
  --_fg: var(--action-fg);
  --_bg-hover: var(--action-bg-hover);
  --_bg-press: var(--action-bg-press);
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-body); font-weight: var(--fw-bold);
  font-size: var(--fs-body-sm); line-height: 1.2; min-height: 48px;
  border: none; border-radius: var(--radius-pill); cursor: pointer;
  padding: 0 24px; text-decoration: none; white-space: nowrap;
  background: var(--_bg); color: var(--_fg);
  transition: background var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.cb-btn:hover { background: var(--_bg-hover); text-decoration: none; color: var(--_fg); }
.cb-btn:active { background: var(--_bg-press); transform: translateY(1px); }
.cb-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.cb-btn[disabled], .cb-btn[aria-disabled="true"] {
  opacity: .45; cursor: not-allowed; pointer-events: none;
}
.cb-btn--sm { font-size: var(--fs-caption); min-height: 38px; padding: 0 16px; gap: 6px; }
.cb-btn--lg { font-size: var(--fs-body); min-height: 56px; padding: 0 32px; }
.cb-btn--green { --_bg: var(--action-green-bg); --_bg-hover: var(--action-green-bg-hover); --_bg-press: var(--green-700); --_fg: #fff; }
.cb-btn--blue { --_bg: var(--blue-500); --_bg-hover: var(--blue-600); --_bg-press: var(--blue-700); --_fg: #fff; }
.cb-btn--primary { box-shadow: var(--shadow-brand); }
.cb-btn--primary:hover { box-shadow: 0 12px 30px color-mix(in srgb, var(--red-500) 34%, transparent); }
.cb-btn--outline {
  background: transparent; color: var(--text-strong);
  box-shadow: inset 0 0 0 var(--border-2) var(--border-strong);
}
.cb-btn--outline:hover { background: var(--surface-sunken); color: var(--text-strong); box-shadow: inset 0 0 0 var(--border-2) var(--text-strong); }
.cb-btn--outline:active { background: var(--surface-sunken); }
.cb-btn--ghost { background: transparent; color: var(--text-strong); }
.cb-btn--ghost:hover { background: var(--surface-sunken); color: var(--text-strong); }
.cb-btn--ghost:active { background: var(--surface-sunken); }
.cb-btn--link { background: transparent; color: var(--text-link); border-radius: var(--radius-xs); padding: 4px 6px; min-height: 0; }
.cb-btn--link:hover { background: transparent; color: var(--text-link-hover); text-decoration: underline; }
.cb-btn--full { width: 100%; }
`;

  function Button(props) {
    props = props || {};
    injectCSS('cb-btn-css', BTN_CSS);
    var variant = props.variant || 'primary';
    var tone = props.tone;
    var size = props.size || 'md';
    var fullWidth = props.fullWidth || false;
    var leadingIcon = props.leadingIcon;
    var trailingIcon = props.trailingIcon;
    var as = props.as;
    var className = props.className || '';
    var children = props.children;

    var classes = ['cb-btn'];
    if (variant === 'primary') classes.push('cb-btn--primary');
    if (variant === 'outline') classes.push('cb-btn--outline');
    if (variant === 'ghost') classes.push('cb-btn--ghost');
    if (variant === 'link') classes.push('cb-btn--link');
    if ((variant === 'primary' || variant === 'solid') && tone === 'green') classes.push('cb-btn--green');
    if ((variant === 'primary' || variant === 'solid') && tone === 'blue') classes.push('cb-btn--blue');
    if (size === 'sm') classes.push('cb-btn--sm');
    if (size === 'lg') classes.push('cb-btn--lg');
    if (fullWidth) classes.push('cb-btn--full');
    if (className) classes.push(className);

    var dom = {};
    for (var k in props) {
      if (k.indexOf('aria-') === 0 || k.indexOf('data-') === 0 || /^on[A-Z]/.test(k) ||
          ['href', 'target', 'rel', 'type', 'name', 'value', 'id', 'title', 'role', 'tabIndex', 'disabled', 'form', 'autoFocus'].indexOf(k) !== -1) {
        dom[k] = props[k];
      }
    }
    var Tag = (props.href || as === 'a') ? 'a' : (as || 'button');
    if (Tag === 'button' && dom.type === undefined) dom.type = 'button';
    dom.className = classes.join(' ');

    return h(Tag, dom,
      leadingIcon,
      children ? h('span', null, children) : null,
      trailingIcon
    );
  }

  /* ---------------------------------------------------------------
     INPUT
     --------------------------------------------------------------- */
  var INPUT_CSS = `
.cb-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.cb-field__label { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
.cb-field__req { color: var(--red-500); margin-left: 2px; }
.cb-input {
  font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-1) solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 12px 14px; width: 100%;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.cb-input::placeholder { color: var(--text-subtle); }
.cb-input:hover { border-color: var(--border-strong); }
.cb-input:focus { outline: none; border-color: var(--blue-500); box-shadow: var(--focus-ring); }
.cb-input:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.cb-input--sm { padding: 8px 12px; font-size: var(--fs-body-sm); }
.cb-input--lg { padding: 15px 16px; font-size: var(--fs-body-lg); }
.cb-field--error .cb-input { border-color: var(--red-500); }
.cb-field--error .cb-input:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--red-500) 35%, transparent); }
.cb-field__msg { font-size: var(--fs-caption); color: var(--text-muted); }
.cb-field--error .cb-field__msg { color: var(--red-600); }
`;

  var _id = 0;

  function Input(props) {
    props = props || {};
    injectCSS('cb-input-css', INPUT_CSS);
    var label = props.label;
    var required = props.required || false;
    var size = props.size || 'md';
    var error = props.error;
    var helperText = props.helperText;
    var multiline = props.multiline || false;
    var id = props.id;
    var className = props.className || '';

    var rest = {};
    for (var k in props) {
      if (['label', 'required', 'size', 'error', 'helperText', 'multiline', 'id', 'className', 'children'].indexOf(k) === -1) {
        rest[k] = props[k];
      }
    }

    var fieldId = id || ('cb-input-' + (++_id));
    var inputClasses = ['cb-input'];
    if (size === 'sm') inputClasses.push('cb-input--sm');
    if (size === 'lg') inputClasses.push('cb-input--lg');
    if (className) inputClasses.push(className);
    var msg = error || helperText;
    var Control = multiline ? 'textarea' : 'input';
    var msgId = msg ? fieldId + '-msg' : undefined;

    var controlProps = Object.assign({}, rest, {
      id: fieldId,
      className: inputClasses.join(' '),
      'aria-invalid': !!error,
      'aria-describedby': msgId
    });

    return h('div', { className: 'cb-field' + (error ? ' cb-field--error' : '') },
      label ? h('label', { className: 'cb-field__label', htmlFor: fieldId },
        label,
        required ? h('span', { className: 'cb-field__req', 'aria-hidden': 'true' }, '*') : null
      ) : null,
      h(Control, controlProps),
      msg ? h('span', { className: 'cb-field__msg', id: msgId }, msg) : null
    );
  }

  /* ---------------------------------------------------------------
     AVATAR
     --------------------------------------------------------------- */
  var AVATAR_CSS = `
.cb-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; overflow: hidden; flex: none;
  font-family: var(--font-body); font-weight: var(--fw-bold); color: #fff;
  background: var(--green-500); user-select: none;
}
.cb-avatar { position: relative; }
.cb-avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: inherit; }
.cb-avatar__txt { line-height: 1; white-space: nowrap; }
.cb-avatar--xs { width: 28px; height: 28px; font-size: 11px; }
.cb-avatar--sm { width: 36px; height: 36px; font-size: 13px; }
.cb-avatar--md { width: 48px; height: 48px; font-size: 16px; }
.cb-avatar--lg { width: 64px; height: 64px; font-size: 22px; }
.cb-avatar--xl { width: 88px; height: 88px; font-size: 30px; }
.cb-avatar--ring { box-shadow: 0 0 0 3px var(--surface-card), 0 0 0 5px var(--red-500); }
.cb-avatar-group { display: inline-flex; }
.cb-avatar-group > .cb-avatar { box-shadow: 0 0 0 3px var(--surface-card); }
.cb-avatar-group > .cb-avatar + .cb-avatar { margin-left: -12px; }
`;

  var TONES = ['var(--green-500)', 'var(--blue-500)', 'var(--red-500)', 'var(--green-600)', 'var(--blue-600)'];

  function initials(name) {
    name = name || '';
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0] || ''; }).join('').toUpperCase();
  }

  function Avatar(props) {
    props = props || {};
    injectCSS('cb-avatar-css', AVATAR_CSS);
    var src = props.src;
    var name = props.name || '';
    var size = props.size || 'md';
    var ring = props.ring || false;
    var className = props.className || '';
    var style = props.style;

    var rest = {};
    for (var k in props) {
      if (['src', 'name', 'size', 'ring', 'className', 'style', 'children'].indexOf(k) === -1) {
        rest[k] = props[k];
      }
    }

    var st = React.useState(false);
    var failed = st[0], setFailed = st[1];
    React.useEffect(function () { setFailed(false); }, [src]);

    var classes = ['cb-avatar', 'cb-avatar--' + size];
    if (ring) classes.push('cb-avatar--ring');
    if (className) classes.push(className);
    var hash = name.split('').reduce(function (a, c) { return a + c.charCodeAt(0); }, 0);
    var bg = TONES[hash % TONES.length];
    var showImg = src && !failed;

    var spanProps = Object.assign({
      className: classes.join(' '),
      style: Object.assign({ background: bg }, style),
      role: 'img',
      'aria-label': name || undefined
    }, rest);

    return h('span', spanProps,
      h('span', { className: 'cb-avatar__txt', 'aria-hidden': 'true' }, initials(name)),
      showImg ? h('img', { src: src, alt: '', onError: function () { setFailed(true); } }) : null
    );
  }

  /* ---------------------------------------------------------------
     EXPORT under the design-system namespace
     --------------------------------------------------------------- */
  window.ColaberryDesignSystem_098454 = Object.assign(
    window.ColaberryDesignSystem_098454 || {},
    { Button: Button, Input: Input, Avatar: Avatar }
  );
})();
