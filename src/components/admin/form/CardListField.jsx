'use client';

import { useMemo, useState } from 'react';
import Field, { CharCounter } from './Field';
import { useFormField } from './AdminForm';
import { parseList, move, RowButtons } from './RepeaterFields';
import { FLATICON_ICONS } from '@/lib/constants/flaticons';
import { EXTRA_CARD_ICONS } from '@/lib/content-config';

const ICONS = [...EXTRA_CARD_ICONS, ...FLATICON_ICONS];

function IconChooser({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const icons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ICONS.filter((icon) => icon.includes(q)) : ICONS;
  }, [query]);

  return (
    <div className="mb-2">
      <button type="button" className="btn btn-light btn-sm d-inline-flex align-items-center gap-2" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="icon-picker__current icon-picker__current--sm">
          <i className={value}></i>
        </span>
        {open ? 'Close icons' : 'Change icon'}
      </button>
      {open && (
        <div className="icon-picker mt-2">
          <div className="icon-picker__head">
            <input type="search" className="form-control form-control-sm" placeholder="Search icons…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="icon-picker__grid" role="listbox" aria-label="Icons">
            {icons.map((icon) => (
              <button
                type="button"
                key={icon}
                title={icon}
                role="option"
                aria-selected={icon === value}
                className={`icon-picker__item${icon === value ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(icon);
                  setOpen(false);
                }}
              >
                <i className={icon}></i>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Icon + title + text cards (core values, benefits), posted as a JSON array. */
export default function CardListField({ name, label, help, max = 9, titleMax = 60, textMax = 400 }) {
  const { error, value } = useFormField(name);
  const [items, setItems] = useState(() => parseList(value, []));
  const update = (index, key, text) => setItems(items.map((it, i) => (i === index ? { ...it, [key]: text } : it)));

  return (
    <Field label={label} help={help} error={error} counter={<small className="text-muted">{items.length}/{max}</small>}>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="repeater">
        {items.map((item, index) => (
          <div className="repeater__row repeater__row--card" key={index}>
            <span className="repeater__index">{index + 1}</span>
            <div className="flex-grow-1 min-w-0">
              <IconChooser value={item.icon} onChange={(icon) => update(index, 'icon', icon)} />
              <div className="d-flex justify-content-between">
                <label className="form-label small mb-1">Title</label>
                <CharCounter length={item.title.length} max={titleMax} />
              </div>
              <input className="form-control mb-2" value={item.title} maxLength={titleMax} minLength={2} required onChange={(e) => update(index, 'title', e.target.value)} />
              <div className="d-flex justify-content-between">
                <label className="form-label small mb-1">Text</label>
                <CharCounter length={item.text.length} max={textMax} />
              </div>
              <textarea className="form-control" rows={2} value={item.text} maxLength={textMax} minLength={5} required onChange={(e) => update(index, 'text', e.target.value)} />
            </div>
            <RowButtons index={index} count={items.length} onMove={(a, b) => setItems(move(items, a, b))} onRemove={(i) => setItems(items.filter((_, j) => j !== i))} />
          </div>
        ))}
        <button type="button" className="btn btn-sm btn-outline-primary" disabled={items.length >= max} onClick={() => setItems([...items, { icon: 'flaticon-award', title: '', text: '' }])}>
          <i className="fa-solid fa-plus me-1"></i>Add card
        </button>
      </div>
    </Field>
  );
}
