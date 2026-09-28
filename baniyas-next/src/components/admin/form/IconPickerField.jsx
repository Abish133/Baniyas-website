'use client';

import { useId, useMemo, useState } from 'react';
import Field from './Field';
import { useFormField } from './AdminForm';
import { FLATICON_ICONS } from '@/lib/constants/flaticons';

/** Searchable grid of the theme's flaticon icons. */
export default function IconPickerField({ name, label, required, help }) {
  const id = useId();
  const { error, value } = useFormField(name);
  const [selected, setSelected] = useState(value || FLATICON_ICONS[0]);
  const [query, setQuery] = useState('');

  const icons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? FLATICON_ICONS.filter((icon) => icon.includes(q)) : FLATICON_ICONS;
  }, [query]);

  return (
    <Field id={id} label={label} required={required} help={help} error={error}>
      <input type="hidden" name={name} value={selected} />
      <div className="icon-picker">
        <div className="icon-picker__head">
          <span className="icon-picker__current">
            <i className={selected}></i>
          </span>
          <code className="small">{selected}</code>
          <input
            id={id}
            type="search"
            className="form-control form-control-sm ms-auto"
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="icon-picker__grid" role="listbox" aria-label="Icons">
          {icons.map((icon) => (
            <button
              type="button"
              key={icon}
              title={icon}
              role="option"
              aria-selected={icon === selected}
              className={`icon-picker__item${icon === selected ? ' is-selected' : ''}`}
              onClick={() => setSelected(icon)}
            >
              <i className={icon}></i>
            </button>
          ))}
          {!icons.length && <div className="text-muted small p-2">No icons match “{query}”.</div>}
        </div>
      </div>
    </Field>
  );
}
